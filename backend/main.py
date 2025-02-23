from fastapi import FastAPI, UploadFile, File
from google.cloud import vision
import firebase_admin
from firebase_admin import credentials, auth
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import firebase_admin.auth as firebase_auth

app = FastAPI()

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


# Load environment variables
load_dotenv()

# Firebase setup
cred = credentials.Certificate("firebase_key.json")  # Path to your Firebase service account key
firebase_admin.initialize_app(cred)

@app.get("/")
def home():
    return {"message": "AstraTax Backend Running"}

@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
