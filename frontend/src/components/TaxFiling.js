import React, { useState } from "react";
import { FaCheckCircle, FaCalculator, FaLightbulb, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const TaxFilingPage = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [regime, setRegime] = useState("new");
  const [selectedITR, setSelectedITR] = useState("");
  const [taxLiability, setTaxLiability] = useState(null);
  const [taxSavings, setTaxSavings] = useState(null);

  const determineITR = () => {
    let itr = "";
    if (income < 5000000 && deductions < 200000 && regime === "new") {
      itr = "ITR-1 (Sahaj)";
    } else if (income > 5000000 || deductions > 200000 || regime === "old") {
      itr = "ITR-2";
    } else {
      itr = "ITR-3";
    }
    setSelectedITR(itr);
  };

  const calculateTax = () => {
    let tax = 0;
    if (regime === "new") {
      tax = income > 250000 ? (income - 250000) * 0.05 : 0;
    } else {
      tax = income > 250000 ? (income - deductions - 250000) * 0.05 : 0;
    }
    setTaxLiability(tax);
    setTaxSavings(income - tax);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold text-yellow-400 mb-6">
        📄 Smart Tax Filing Assistant
      </motion.h1>
      <p className="mb-4 text-gray-300 text-lg">File your taxes easily with AI-powered insights and tax-saving tips.</p>

      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Enter Your Details</h2>
        
        <label className="block text-gray-300 text-sm font-medium mb-1">Income (₹)</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 mb-4 focus:border-yellow-400"
          placeholder="Enter your total income"
        />
        
        <label className="block text-gray-300 text-sm font-medium mb-1">Deductions (₹) (Old Regime Only)</label>
        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 mb-4 focus:border-yellow-400"
          placeholder="Enter total deductions"
          disabled={regime === "new"}
        />

        <label className="block text-gray-300 text-sm font-medium mb-1">Choose Tax Regime</label>
        <select
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 mb-4 focus:border-yellow-400"
        >
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>

        <div className="flex space-x-4">
          <button
            onClick={determineITR}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center"
          >
            <FaLightbulb className="mr-2" /> 🔍 Find ITR Form
          </button>
          <button
            onClick={calculateTax}
            className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center"
          >
            <FaCalculator className="mr-2" /> 📊 Calculate Tax
          </button>
        </div>

        {selectedITR && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg text-center">
            <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
            <p className="text-lg font-semibold">Recommended Form: {selectedITR}</p>
            <a
              href="https://www.incometax.gov.in/iec/foportal/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center font-bold"
            >
              🚀 Proceed to e-Filing
            </a>
          </div>
        )}

        {taxLiability !== null && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-yellow-400">Estimated Tax Liability: ₹{taxLiability}</h3>
            <h4 className="text-lg font-semibold text-green-400">Potential Tax Savings: ₹{taxSavings}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxFilingPage;
