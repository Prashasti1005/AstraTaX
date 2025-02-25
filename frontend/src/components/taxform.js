import React, { useState, useEffect } from "react";

const TaxForm = ({ onSubmit, extractedData }) => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [regime, setRegime] = useState("new");

  // ✅ Auto-fill extracted data when it changes
  useEffect(() => {
    if (extractedData) {
      setIncome(extractedData.income || "");
      setDeductions(extractedData.deductions || "");
    }
  }, [extractedData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ income: parseFloat(income), deductions: parseFloat(deductions), regime });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-lg mx-auto p-8 rounded-2xl bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-xl border border-gray-700 text-center"
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 tracking-wide">
        💰 Tax Calculator
      </h2>

      {/* Income Input */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">Income (₹)</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-3 text-lg rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-shadow shadow-md"
          placeholder="Enter your income"
          required
        />
      </div>

      {/* Deductions Input */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">Deductions (₹)</label>
        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          className="w-full p-3 text-lg rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-shadow shadow-md"
          placeholder="Enter your deductions"
          required
        />
      </div>

      {/* Tax Regime Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">Tax Regime</label>
        <select
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
          className="w-full p-3 text-lg rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-shadow shadow-md"
        >
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
      >
        ⚡ Calculate Tax
      </button>
    </form>
  );
};

export default TaxForm;
