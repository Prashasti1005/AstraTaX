import React, { useState, useEffect } from "react";

const AIAnalysis = ({ fileData, onAnalysisComplete }) => {
  const [loading, setLoading] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (!fileData) return;

    setTimeout(() => {
      setAnalysisResult({
        deductions: "You qualify for a ₹15,000 tax deduction!",
        risk: "No audit risk detected.",
      });
      setLoading(false);
      onAnalysisComplete();
    }, 2000);
  }, [fileData, onAnalysisComplete]);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      {loading ? "Analyzing your document..." : (
        <div>
          <p>✅ {analysisResult.deductions}</p>
          <p>🔍 {analysisResult.risk}</p>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
