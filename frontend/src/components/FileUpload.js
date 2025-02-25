import React, { useState } from "react";

const FileUpload = ({ onExtractedData }) => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadMessage("");
    setExtractedText("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("⚠️ Please select a file first.");
      return;
    }

    try {
      // ✅ Upload File
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("http://127.0.0.1:8000/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed.");
      }

      setUploadMessage("✅ File uploaded successfully!");

      // ✅ Trigger OCR Extraction
      const ocrResponse = await fetch("http://127.0.0.1:8000/ocr", {
        method: "POST",
      });

      if (!ocrResponse.ok) {
        throw new Error("OCR extraction failed.");
      }

      const ocrData = await ocrResponse.json();
      setExtractedText(ocrData.extracted_text || "No text detected.");

      // ✅ Send Extracted Data to Tax Form
      onExtractedData({ income: ocrData.income, deductions: ocrData.deductions });
      
    } catch (error) {
      setUploadMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center w-96 mx-auto">
      <h2 className="text-lg font-semibold text-white mb-3">📄 Upload Tax Document</h2>
      
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-800"
      />

      <button
        onClick={handleUpload}
        className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
      >
        Upload & Extract Text
      </button>

      {uploadMessage && <p className="mt-3 text-sm text-yellow-300">{uploadMessage}</p>}

      {extractedText && (
        <div className="mt-4 p-3 bg-gray-800 rounded text-white text-sm">
          <h3 className="font-semibold">📜 Extracted Text:</h3>
          <p className="mt-2">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
