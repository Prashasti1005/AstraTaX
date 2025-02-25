import React, { useState } from "react";
import { FaFileUpload, FaRobot, FaRocket, FaCheck, FaSpinner } from "react-icons/fa";
import axios from "axios";

const HowItWorks = () => {
  const [step, setStep] = useState(0); // Tracks the demo progress
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Simulate Each Step with Real Google APIs
  const runDemo = async () => {
    try {
      setLoading(true);
      setStep(1);
      setMessage("Uploading document to Google Cloud...");

      // Step 1: Upload Document to Google Cloud Storage
      const uploadResponse = await axios.post("http://localhost:8000/upload-document");
      console.log("Upload Response:", uploadResponse.data);
      
      setStep(2);
      setMessage("Extracting text using Google Cloud Vision...");

      // Step 2: Extract Text using Google Cloud Vision
      const ocrResponse = await axios.post("http://localhost:8000/ocr");
      console.log("OCR Response:", ocrResponse.data);

      setStep(3);
      setMessage("Analyzing tax deductions using BigQuery ML...");

      // Step 3: Analyze Tax Data using BigQuery ML
      const taxAnalysisResponse = await axios.post("http://localhost:8000/analyze-tax");
      console.log("Tax Analysis Response:", taxAnalysisResponse.data);

      setStep(4);
      setMessage("Filing tax return automatically...");

      // Step 4: Auto-File Tax Return using FastAPI
      const filingResponse = await axios.post("http://localhost:8000/auto-file");
      console.log("Tax Filing Response:", filingResponse.data);

      setMessage("✅ Tax return filed successfully!");
    } catch (error) {
      console.error("Error during the demo:", error);
      setMessage("❌ Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-center text-white">
      <h2 className="text-5xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
        {/* Step 1 */}
        <div className={`relative p-6 bg-gray-800/50 border border-gray-700 shadow-lg rounded-xl max-w-sm transform transition ${step >= 1 ? "scale-105 border-yellow-400" : ""}`}>
          {step === 1 && loading ? <FaSpinner className="text-yellow-400 text-4xl animate-spin mb-3" /> : <FaFileUpload className="text-4xl text-yellow-400 mb-3" />}
          <h3 className="text-2xl font-bold text-white">1️⃣ Upload Documents 📄</h3>
          <p className="text-gray-300 mt-2">Securely upload invoices, salary slips, and bank statements.</p>
          {step >= 1 && <FaCheck className="absolute top-3 right-3 text-green-400 text-xl" />}
        </div>

        {/* Step 2 */}
        <div className={`relative p-6 bg-gray-800/50 border border-gray-700 shadow-lg rounded-xl max-w-sm transform transition ${step >= 2 ? "scale-105 border-blue-400" : ""}`}>
          {step === 2 && loading ? <FaSpinner className="text-blue-400 text-4xl animate-spin mb-3" /> : <FaRobot className="text-4xl text-blue-400 mb-3" />}
          <h3 className="text-2xl font-bold text-white">2️⃣ AI Analyzes & Optimizes 🤖</h3>
          <p className="text-gray-300 mt-2">AI extracts key data and suggests tax-saving deductions in real time.</p>
          {step >= 2 && <FaCheck className="absolute top-3 right-3 text-green-400 text-xl" />}
        </div>

        {/* Step 3 */}
        <div className={`relative p-6 bg-gray-800/50 border border-gray-700 shadow-lg rounded-xl max-w-sm transform transition ${step >= 3 ? "scale-105 border-green-400" : ""}`}>
          {step === 3 && loading ? <FaSpinner className="text-green-400 text-4xl animate-spin mb-3" /> : <FaRocket className="text-4xl text-green-400 mb-3" />}
          <h3 className="text-2xl font-bold text-white">3️⃣ File in One Click 🚀</h3>
          <p className="text-gray-300 mt-2">Submit your tax return instantly with a single click.</p>
          {step >= 3 && <FaCheck className="absolute top-3 right-3 text-green-400 text-xl" />}
        </div>
      </div>

      {/* Call to Action */}
      <button
        onClick={runDemo}
        disabled={loading}
        className={`mt-12 px-8 py-3 text-black text-lg font-bold rounded-lg shadow-md transition ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}
      >
        {loading ? "Processing..." : "🚀 Try a Live Demo"}
      </button>

      {/* Status Message */}
      <p className="mt-6 text-lg text-yellow-400 font-semibold">{message}</p>
    </section>
  );
};

export default HowItWorks;
