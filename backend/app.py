app.py 
import pandas as pd
import joblib
import networkx as nx
import torch
from torch_geometric.data import Data
from torch_geometric.nn import GCNConv
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from fastapi import FastAPI
from pydantic import BaseModel

# Initialize FastAPI
app = FastAPI()

# Load dataset
df = pd.read_csv(r"C:\Users\Prashasti Singh\google girl\astratax\backend\fraud_dataset.csv")

# Create Graph Representation
G = nx.DiGraph()
for index, row in df.iterrows():
    G.add_edge(row["oldbalanceOrg"], row["oldbalanceDest"], amount=row["amount"])

# Convert Graph to PyTorch Geometric Data Format
edge_index = torch.tensor(list(G.edges)).t().contiguous()
edge_attr = torch.tensor([list(G[u][v].values()) for u, v in G.edges()], dtype=torch.float)

# Decision Tree Model
features = ["amount", "oldbalanceOrg", "newbalanceOrig", "oldbalanceDest", "newbalanceDest"]
X = df[features]
y = df["isFraud"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
dt_model = DecisionTreeClassifier()
dt_model.fit(X_train, y_train)

# Save Decision Tree Model
joblib.dump(dt_model, "decision_tree_model.pkl")

# Define GNN Model
class GNN(torch.nn.Module):
    def __init__(self):
        super(GNN, self).__init__()
        self.conv1 = GCNConv(edge_attr.shape[1], 16)
        self.conv2 = GCNConv(16, 1)

    def forward(self, x, edge_index, edge_attr):
        x = self.conv1(edge_attr, edge_index)
        x = torch.relu(x)
        x = self.conv2(x, edge_index)
        return torch.sigmoid(x)

# Train GNN Model
gnn_model = GNN()
optimizer = torch.optim.Adam(gnn_model.parameters(), lr=0.01)
criterion = torch.nn.BCELoss()

for epoch in range(100):
    optimizer.zero_grad()
    output = gnn_model(None, edge_index, edge_attr).squeeze()
    loss = criterion(output, torch.tensor(y_train.values, dtype=torch.float))
    loss.backward()
    optimizer.step()

# Save GNN Model
torch.save(gnn_model.state_dict(), "gnn_model.pth")

# Request Model
class TransactionData(BaseModel):
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float

# Load Models
dt_model = joblib.load("decision_tree_model.pkl")
gnn_model.load_state_dict(torch.load("gnn_model.pth"))

@app.post("/api/predict_audit_risk/")
async def predict_risk(data: TransactionData):
    # Predict with Decision Tree
    input_data = [[data.amount, data.oldbalanceOrg, data.newbalanceOrig, data.oldbalanceDest, data.newbalanceDest]]
    risk_score_dt = dt_model.predict(input_data)[0]

    # Predict with GNN
    edge_input = torch.tensor([[data.oldbalanceOrg, data.oldbalanceDest]], dtype=torch.long).t().contiguous()
    edge_features = torch.tensor([[data.amount]], dtype=torch.float)
    risk_score_gnn = gnn_model(None, edge_input, edge_features).item()

    # Final Risk Score (Weighted)
    final_risk_score = (risk_score_dt * 0.5) + (risk_score_gnn * 0.5)

    return {
        "audit_risk_score": round(final_risk_score * 100, 2),
        "fraud_detected": final_risk_score > 0.5
    }
