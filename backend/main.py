from fastapi import FastAPI, UploadFile, File, HTTPException
from google.cloud import vision
import firebase_admin
from firebase_admin import credentials, auth
import os
from dotenv import load_dotenv
import google.generativeai as genai  
from fastapi import Depends
from pydantic import BaseModel
import firebase_admin.auth as firebase_auth
from google.cloud import bigquery

# Load environment variables
load_dotenv()

# ✅ Correct Gemini AI Initialization
genai.configure(api_key=os.getenv("AIzaSyD9I2olKeQr15F8Dc6s4AkRvOwoZST7NCg"))
gemini_model = genai.GenerativeModel("gemini-pro")  # Use "gemini-pro" model

# Initialize FastAPI app
app = FastAPI()
client = bigquery.Client()

class AIRequest(BaseModel):
    query: str

@app.post("/ask-ai/")
async def ask_ai(question: str = Body(..., embed=True)):
    """Processes tax-related queries using Gemini AI & tax database."""
    
    try:
        # Query tax database for relevant information
        query = f"""
        SELECT response FROM tax_data 
        WHERE question LIKE '%{question}%'
        LIMIT 1
        """
        results = client.query(query).result()
        tax_data = [row.response for row in results]

        # Use Gemini AI with tax knowledge
        response = genai.generate_content(
            f"Answer the following tax question using the provided data: {tax_data} \nQuestion: {question}"
        )

        return {"answer": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/ping")
def ping():
    return {"message": "pong"}

# ✅ Define Pydantic model for tax calculation input
class TaxInput(BaseModel):
    income: float
    deductions: float
    regime: str

# ✅ Tax calculation logic
def calculate_new_regime_tax(income):
    """Calculate tax as per the New Tax Regime (2023-24)."""
    tax_slabs = [
        (300000, 0.0),
        (600000, 5),
        (900000, 10),
        (1200000, 15),
        (1500000, 20),
        (float("inf"), 30),
    ]
    tax = 0
    prev_limit = 0

    for limit, rate in tax_slabs:
        if income > prev_limit:
            taxable_amount = min(income, limit) - prev_limit
            tax += taxable_amount * (rate / 100)
        prev_limit = limit

    return tax

def calculate_old_regime_tax(income):
    """Calculate tax as per the Old Tax Regime (2023-24)."""
    tax_slabs = [
        (250000, 0.0),
        (500000, 5),
        (1000000, 20),
        (float("inf"), 30),
    ]
    tax = 0
    prev_limit = 0

    for limit, rate in tax_slabs:
        if income > prev_limit:
            taxable_amount = min(income, limit) - prev_limit
            tax += taxable_amount * (rate / 100)
        prev_limit = limit

    return tax

# ✅ Fix AI-powered tax-saving suggestions
def generate_ai_suggestion(prompt: str):
    """Generate AI-based tax-saving suggestions using Gemini."""
    try:
        response = gemini_model.generate_content(prompt)
        return response.text  # Extract text response
    except Exception as e:
        return "Error generating AI response."

@app.post("/calculate-tax")
def calculate_tax(data: TaxInput):
    """Determine tax based on selected regime and provide AI suggestions."""
    taxable_income = max(0, data.income - data.deductions)
    
    if data.regime == "new":
        tax = calculate_new_regime_tax(taxable_income)
    else:
        tax = calculate_old_regime_tax(taxable_income)

    # ✅ Get AI-based tax-saving tips
    ai_prompt = f"Suggest tax-saving strategies for a person with ₹{data.income} income under the {data.regime} tax regime in India."
    suggestion = generate_ai_suggestion(ai_prompt)

    return {"tax": round(tax, 2), "suggestion": suggestion}

# ✅ Firebase Authentication
class LoginRequest(BaseModel):
    id_token: str  # Token received from frontend

@app.post("/login")
def login(request: LoginRequest):
    try:
        # Verify the token from frontend
        decoded_token = firebase_auth.verify_id_token(request.id_token)
        user_id = decoded_token["uid"]
        return {"message": "Login successful", "user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid Token")

# ✅ Firebase setup
cred = credentials.Certificate("firebase_key.json")  # Path to your Firebase service account key
firebase_admin.initialize_app(cred)

@app.get("/")
def home():
    return {"message": "AstraTax Backend Running"}

@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
