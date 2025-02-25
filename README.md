# AstraTax - AI-Powered Tax Assistant

AstraTax is an AI-driven tax optimization and filing assistant that simplifies tax calculations, maximizes tax savings, and ensures compliance using machine learning and cloud-based technologies.

---

## 🛠️ Tech Stack
### **Frontend**
- React.js + Tailwind CSS

### **Backend**
- FastAPI (Python)
- PostgreSQL for structured tax records
- Google BigQuery for scalable ML queries

### **AI & ML**
- **Google Cloud Vision OCR**: Extracts data from financial documents.
- **BigQuery ML**: Predicts tax deductions and optimizes filings.
- **Graph Neural Networks (GNNs)**: Detects fraudulent transactions.
- **Decision Trees & Random Forest**: Analyze audit risk factors.
- **Gemini AI (NLP)**: Powers the tax chatbot.

---

## 📦 Backend Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/astratax.git
cd astratax
```
### **2. Create Virtual Environment**
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
### **3. Install Dependencies**
```sh
pip install -r requirements.txt
```
### **4. Setup Environment Variables**
Create a .env file inside the backend/ directory and add:
```sh
GOOGLE_CLOUD_VISION_API_KEY=your_google_api_key
BIGQUERY_PROJECT_ID=your_bigquery_project_id
DATABASE_URL=postgresql://username:password@localhost/db_name
```
### **5. Run FastAPI Server**
```sh
uvicorn main:app --reload
```
The backend runs on http://127.0.0.1:8000.

## 📦 Frontend Setup
### **1.Install Dependencies**
```sh
cd frontend
npm install
```
### **2.Setup Environment Variables**
Create a .env file inside the frontend/ directory and add:
```sh
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```
### **3.Run React App**
```sh
npm start
```
The frontend runs on http://localhost:3000.

## Running Tests
### **Backend Tests**
```sh
pytest
```
### **Frontend Tests**
```sh
npm test
```
## 📦 Project Structure
```sh
/astratax
 ├── /backend        # FastAPI backend
 │   ├── main.py     # API endpoints
 │   ├── models.py   # Database models
 │   ├── utils.py  # Utility functions
 │   ├── /services
 │   │   ├── cloud_storage.py
 │   │   ├── ocr.py
 │   │   ├── tax_analysis.py
 │   │   ├── tax_filing.py
 │   ├── firebase_key.json
 ├── /frontend       # React frontend
 │   ├── src/
 │   ├── App.js
 │   ├── index.js
 │   ├── tailwind.config.js
 ├── /ml_models      # AI Models for tax optimization
 ├── README.md       # This file
 ├── .env.example    # Example environment file
 ├── requirements.txt # Backend dependencies
 ├── package.json # Frontend dependencies
 ├── postcss.config.js
 ├── .gitignore
```
##  Future Enhancements
- Expand to global tax systems.
- Introduce AI-powered financial advisory.
- Implement voice-based tax consultation.

## Contact
Prashasti Singh
Email: b23224@students.iitmandi.ac.in
