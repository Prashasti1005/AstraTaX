import React, { useState } from "react";
import { FaCheckCircle, FaCalculator, FaLightbulb, FaChartPie, FaRegMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import taxAnimation from "./animations/tax.json";
import savingsAnimation from "./animations/savings.json";

const TaxFilingPage = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [regime, setRegime] = useState("new");
  const [selectedITR, setSelectedITR] = useState("");
  const [taxLiability, setTaxLiability] = useState(null);
  const [taxSavings, setTaxSavings] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const determineITR = () => {
    let itr = "";
    if (income < 5000000 && deductions < 200000 && regime === "new") {
      itr = "ITR-1 (Sahaj)";
    } else {
      itr = "ITR-2";
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
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-gradient-to-br from-gray-100 to-white text-gray-900'} p-6 transition-all duration-500`}>
      <motion.button onClick={() => setDarkMode(!darkMode)} className="absolute top-6 right-6 text-2xl p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-yellow-400 transition-transform transform hover:scale-110">
        {darkMode ? <FaSun /> : <FaRegMoon />}
      </motion.button>

      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-5xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
        📄 Smart Tax Filing Assistant
      </motion.h1>

      <Lottie animationData={taxAnimation} className="w-56 h-56" />

      <div className="w-full max-w-2xl bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Enter Your Details</h2>
        
        <label className="block text-gray-300 text-sm font-medium mb-1">Income (₹)</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your total income"
        />
        
        <label className="block text-gray-300 text-sm font-medium mb-1">Deductions (₹) (Old Regime Only)</label>
        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter total deductions"
          disabled={regime === "new"}
        />

        <label className="block text-gray-300 text-sm font-medium mb-1">Choose Tax Regime</label>
        <select
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>

        <div className="flex space-x-4">
          <motion.button
            onClick={determineITR}
            whileHover={{ scale: 1.05 }}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center shadow-lg"
          >
            <FaLightbulb className="mr-2" /> 🔍 Find ITR Form
          </motion.button>
          <motion.button
            onClick={calculateTax}
            whileHover={{ scale: 1.05 }}
            className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center shadow-lg"
          >
            <FaCalculator className="mr-2" /> 📊 Calculate Tax
          </motion.button>
        </div>

        {selectedITR && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
            <p className="text-lg font-semibold">Recommended Form: {selectedITR}</p>
            <a
              href="https://www.incometax.gov.in/iec/foportal/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center font-bold shadow-lg"
            >
              🚀 Proceed to e-Filing
            </a>
          </div>
        )}

        {taxLiability !== null && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <Lottie animationData={savingsAnimation} className="w-24 h-24 mx-auto" />
            <h3 className="text-lg font-semibold text-yellow-400">Estimated Tax Liability: ₹{taxLiability}</h3>
            <h4 className="text-lg font-semibold text-green-400">Potential Tax Savings: ₹{taxSavings}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxFilingPage;
