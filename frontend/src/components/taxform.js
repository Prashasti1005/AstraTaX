import React, { useState } from "react";

const TaxForm = ({ onSubmit }) => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [regime, setRegime] = useState("new"); // Default to New Regime

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ income: parseFloat(income), deductions: parseFloat(deductions), regime });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <form 
        onSubmit={handleSubmit} 
        className="p-8 bg-gray-900/70 backdrop-blur-xl border border-gray-700 shadow-lg rounded-xl max-w-lg w-full"
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6 drop-shadow-lg">
          AstraTax Calculator
        </h2>

        {/* Income Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Annual Income (₹)</label>
          <input
            type="number"
            placeholder="Enter your income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
          />
        </div>

        {/* Deductions Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Deductions (₹)</label>
          <input
            type="number"
            placeholder="Enter deductions"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
          />
        </div>

        {/* Tax Regime Selector */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-1">Select Tax Regime</label>
          <select
            value={regime}
            onChange={(e) => setRegime(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 transition"
          >
            <option value="new">New Tax Regime</option>
            <option value="old">Old Tax Regime</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition transform hover:scale-105 shadow-lg"
        >
          Calculate Tax 🚀
        </button>
      </form>
    </div>
  );
};

export default TaxForm;
