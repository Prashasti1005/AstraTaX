import React, { useState } from "react";
import { FaCheckCircle, FaCalculator, FaLightbulb, FaChartPie, FaRegMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import taxAnimation from "./animations/tax.json";
import savingsAnimation from "./animations/savings.json";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const GlobalTaxFilingPage = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [regime, setRegime] = useState("new");
  const [selectedITR, setSelectedITR] = useState("");
  const [taxLiability, setTaxLiability] = useState(null);
  const [taxSavings, setTaxSavings] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [taxTips, setTaxTips] = useState([]);

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
    generateTaxTips(tax, deductions);
  };

  const generateTaxTips = (tax, deductions) => {
    let tips = [];
    if (tax > 50000) tips.push("Consider investing in tax-saving instruments like ELSS, PPF, or NPS.");
    if (deductions < 150000) tips.push("Maximize your deductions by utilizing Section 80C exemptions.");
    if (income > 1000000) tips.push("Opt for health insurance tax benefits under Section 80D.");
    setTaxTips(tips);
  };

  const taxBracketData = {
    labels: ["₹0-₹2.5L", "₹2.5L-₹5L", "₹5L-₹10L", "₹10L+"],
    datasets: [
      {
        label: "Tax Percentage",
        data: [0, 5, 10, 30],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
      },
    ],
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6 transition-all duration-500`}>
      <motion.button onClick={() => setDarkMode(!darkMode)} className="absolute top-6 right-6 text-2xl p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-yellow-400 transition-transform transform hover:scale-110">
        {darkMode ? <FaSun /> : <FaRegMoon />}
      </motion.button>

      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-5xl font-bold text-yellow-400 mb-6">
        📄 Smart Tax Filing Assistant
      </motion.h1>

      <Lottie animationData={taxAnimation} className="w-56 h-56" />

      <div className="w-full max-w-2xl bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Enter Your Details</h2>
        
        <label className="block mb-1">Income (₹)</label>
        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4" />
        
        <label className="block mb-1">Deductions (₹) (Old Regime Only)</label>
        <input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4" disabled={regime === "new"} />

        <label className="block mb-1">Choose Tax Regime</label>
        <select value={regime} onChange={(e) => setRegime(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4">
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>

        <div className="flex space-x-4">
          <motion.button onClick={determineITR} whileHover={{ scale: 1.05 }} className="bg-yellow-500 text-black py-3 rounded-lg flex-1">
            <FaLightbulb className="mr-2" /> 🔍 Find ITR Form
          </motion.button>
          <motion.button onClick={calculateTax} whileHover={{ scale: 1.05 }} className="bg-green-500 text-black py-3 rounded-lg flex-1">
            <FaCalculator className="mr-2" /> 📊 Calculate Tax
          </motion.button>
        </div>

        {selectedITR && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
            <p className="text-lg font-semibold">Recommended Form: {selectedITR}</p>
            <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" className="block mt-4 bg-blue-600 text-white py-2 rounded-lg">
              🚀 Proceed to e-Filing
            </a>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-yellow-400">Tax Brackets</h3>
          <Bar data={taxBracketData} />
        </div>

        {taxTips.length > 0 && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-400">Tax-Saving Tips</h3>
            <ul>{taxTips.map((tip, index) => (<li key={index}>✅ {tip}</li>))}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalTaxFilingPage;
