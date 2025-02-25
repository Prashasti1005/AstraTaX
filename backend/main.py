from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from google.cloud import vision, bigquery, storage
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
import os
from dotenv import load_dotenv
import google.generativeai as genai
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import shutil

# ✅ Load environment variables
load_dotenv()

# ✅ Initialize Google Gemini AI
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-pro")

# ✅ Google Cloud Clients
storage_client = storage.Client()
vision_client = vision.ImageAnnotatorClient()
bigquery_client = bigquery.Client()

# ✅ Firebase Setup
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)

# ✅ FastAPI App with CORS
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing (restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Environment Variables
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
UPLOAD_DIR = "uploaded_files"

# ✅ Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

# 🔹 Pydantic Models
class AIRequest(BaseModel):
    query: str

class TaxInput(BaseModel):
    income: float
    deductions: float
    regime: str

class LoginRequest(BaseModel):
    id_token: str

# ✅ Helper Function: Verify Firebase Token
def verify_token(id_token: str):
    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# ✅ Upload Document & Extract Text
@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save file locally
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Upload file to GCS
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob(file.filename)
        blob.upload_from_filename(file_path)
        file_url = f"gs://{BUCKET_NAME}/{file.filename}"

        # 🔹 Extract text immediately after upload
        image = vision.Image(source=vision.ImageSource(gcs_image_uri=file_url))
        response = vision_client.document_text_detection(image=image)
        extracted_text = response.text_annotations[0].description if response.text_annotations else "No text detected"

        return {
            "message": "Document uploaded successfully!",
            "file_url": file_url,
            "extracted_text": extracted_text  # ✅ Return extracted text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Analyze Tax with BigQuery
@app.post("/analyze-tax")
async def analyze_tax():
    try:
        query = "SELECT tax_deductions FROM `your-project.tax_dataset.tax_analysis_model`"
        results = bigquery_client.query(query).result()
        deductions = [row.tax_deductions for row in results]

        return {"deductions": deductions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ AI Tax Assistant (Gemini AI & BigQuery)
@app.post("/ask-ai/")
async def ask_ai(query: AIRequest):
    try:
        # Query BigQuery for tax data
        query_text = f"""
        SELECT response FROM tax_data 
        WHERE LOWER(question) LIKE LOWER('%{query.query}%')
        LIMIT 1
        """
        results = bigquery_client.query(query_text).result()
        tax_data = [row.response for row in results]

        # AI-Generated Tax Response
        ai_prompt = f"Provide an accurate tax answer using the given tax law data: {tax_data}. \nQuestion: {query.query}"
        response = gemini_model.generate_content(ai_prompt)

        return {"answer": response.text if response else "No relevant tax data found."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ AI Tax Calculation
@app.post("/calculate-tax")
def calculate_tax(data: TaxInput):
    taxable_income = max(0, data.income - data.deductions)

    def calculate_new_regime_tax(income):
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

    # AI-Powered Tax-Saving Tips
    ai_prompt = f"Suggest tax-saving strategies for a person with ₹{data.income} income under the {data.regime} tax regime in India."
    try:
        ai_suggestion = gemini_model.generate_content(ai_prompt).text
    except:
        ai_suggestion = "AI tax-saving suggestions unavailable."

    return {"tax": round(tax, 2), "suggestion": ai_suggestion}

# ✅ Firebase Authentication
@app.post("/login")
def login(request: LoginRequest):
    try:
        decoded_token = verify_token(request.id_token)
        return {"message": "Login successful", "user_id": decoded_token["uid"]}

    except:
        raise HTTPException(status_code=401, detail="Invalid Token")

# ✅ Ping for Health Check
@app.get("/ping")
def ping():
    return {"message": "pong"}

# ✅ Home Route
@app.get("/")
def home():
    return {"message": "AstraTax Backend Running"}
