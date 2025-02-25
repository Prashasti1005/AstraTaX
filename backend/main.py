from fastapi import FastAPI, UploadFile, File, HTTPException, Body
from google.cloud import vision, bigquery
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
import os
from dotenv import load_dotenv
import google.generativeai as genai
from pydantic import BaseModel

# ✅ Load environment variables
load_dotenv()

# ✅ Initialize Google Gemini AI
genai.configure(api_key=os.getenv("AIzaSyD9I2olKeQr15F8Dc6s4AkRvOwoZST7NCg"))  # Store API key in .env
gemini_model = genai.GenerativeModel("gemini-pro")

# ✅ Initialize FastAPI app
app = FastAPI()
client = bigquery.Client()

# ✅ Firebase Setup
cred = credentials.Certificate("firebase_key.json")  # Ensure this path is correct
firebase_admin.initialize_app(cred)

# 🔹 Pydantic Models
class AIRequest(BaseModel):
    query: str

class TaxInput(BaseModel):
    income: float
    deductions: float
    regime: str

class LoginRequest(BaseModel):
    id_token: str  # Token received from frontend

# ✅ AI Chatbot using Gemini & BigQuery Tax Database
@app.post("/ask-ai/")
async def ask_ai(query: AIRequest):
    """Processes tax-related queries using Gemini AI & BigQuery tax database."""
    try:
        # 🔹 Query tax database for relevant information
        query_text = f"""
        SELECT response FROM tax_data 
        WHERE LOWER(question) LIKE LOWER('%{query.query}%')
        LIMIT 1
        """
        results = client.query(query_text).result()
        tax_data = [row.response for row in results]

        # 🔹 Use Gemini AI with tax knowledge
        ai_prompt = f"Provide an accurate tax answer using the given tax law data: {tax_data}. \nQuestion: {query.query}"
        response = gemini_model.generate_content(ai_prompt)

        return {"answer": response.text if response else "No relevant tax data found."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# ✅ AI-Powered Tax Calculation
@app.post("/calculate-tax")
def calculate_tax(data: TaxInput):
    """Determine tax based on the selected regime and provide AI-generated suggestions."""
    taxable_income = max(0, data.income - data.deductions)

    def calculate_new_regime_tax(income):
        """New Tax Regime (2023-24)"""
        tax_slabs = [(300000, 0.0), (600000, 5), (900000, 10), (1200000, 15), (1500000, 20), (float("inf"), 30)]
        tax = 0
        prev_limit = 0
        for limit, rate in tax_slabs:
            if income > prev_limit:
                taxable_amount = min(income, limit) - prev_limit
                tax += taxable_amount * (rate / 100)
            prev_limit = limit
        return tax

    def calculate_old_regime_tax(income):
        """Old Tax Regime (2023-24)"""
        tax_slabs = [(250000, 0.0), (500000, 5), (1000000, 20), (float("inf"), 30)]
        tax = 0
        prev_limit = 0
        for limit, rate in tax_slabs:
            if income > prev_limit:
                taxable_amount = min(income, limit) - prev_limit
                tax += taxable_amount * (rate / 100)
            prev_limit = limit
        return tax

    tax = calculate_new_regime_tax(taxable_income) if data.regime == "new" else calculate_old_regime_tax(taxable_income)

    # 🔹 AI-Powered Tax-Saving Tips
    ai_prompt = f"Suggest tax-saving strategies for a person with ₹{data.income} income under the {data.regime} tax regime in India."
    try:
        ai_suggestion = gemini_model.generate_content(ai_prompt).text
    except:
        ai_suggestion = "AI tax-saving suggestions unavailable at the moment."

    return {"tax": round(tax, 2), "suggestion": ai_suggestion}

# ✅ Firebase Authentication
@app.post("/login")
def login(request: LoginRequest):
    try:
        decoded_token = firebase_auth.verify_id_token(request.id_token)
        return {"message": "Login successful", "user_id": decoded_token["uid"]}
    except:
        raise HTTPException(status_code=401, detail="Invalid Token")

# ✅ Ping Route (For Health Check)
@app.get("/ping")
def ping():
    return {"message": "pong"}

# ✅ File Upload Route
@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}

# ✅ Home Route
@app.get("/")
def home():
    return {"message": "AstraTax Backend Running"}
