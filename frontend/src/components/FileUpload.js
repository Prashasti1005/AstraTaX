import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("File uploaded successfully!");
      onUploadComplete(response.data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed!");
    }

    setUploading(false);
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button 
        onClick={handleUpload} 
        className="bg-yellow-500 px-4 py-2 rounded-lg"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );
};

export default FileUpload;
