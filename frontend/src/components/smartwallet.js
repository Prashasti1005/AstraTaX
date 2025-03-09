import React, { useState, useEffect } from "react";
import { FaWallet, FaPlus, FaChartPie, FaTrophy, FaSun, FaMoon, FaSearch, FaTrash, FaAward, FaBolt, FaGamepad } from "react-icons/fa";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";

// 🎯 Mock AI Insights API (Simulating Gemini AI)
const getAIInsights = (transactions) => {
  const totalDeduction = transactions
    .filter((t) => t.category === "Tax Deduction" && t.transactionType === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return totalDeduction > 50000
    ? "You're optimizing your tax savings well! Consider investing in tax-saving instruments for better benefits."
    : "You can maximize your savings by increasing tax-deductible expenses like insurance and retirement funds.";
};

const SmartTaxWallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Tax Deduction");
  const [transactionType, setTransactionType] = useState("Expense");
  const [darkMode, setDarkMode] = useState(true);
  const [taxGoal, setTaxGoal] = useState(1000000);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiInsight, setAiInsight] = useState("");
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [xp, setXp] = useState(0);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [spinResult, setSpinResult] = useState("");

  useEffect(() => {
    if (transactions.length > 0) {
      setStreak(streak + 1);
      checkMilestones();
      setXp((prevXp) => prevXp + 50);
    }
  }, [transactions]);

  // 🌟 Add Transaction
  const addTransaction = () => {
    if (!amount) return;
    const newTransactions = [...transactions, { amount: parseFloat(amount), category, transactionType }];
    setTransactions(newTransactions);
    setAmount("");
    setAiInsight(getAIInsights(newTransactions));
  };

  // ❌ Delete Transaction
  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    setAiInsight(getAIInsights(updatedTransactions));
  };

  // 📈 Calculate Tax Savings
  const taxSavings = transactions
    .filter((t) => t.category === "Tax Deduction" && t.transactionType === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // 🔍 Filter Transactions
  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📊 Chart Data
  const chartData = {
    series: [
      transactions.filter((t) => t.category === "Tax Deduction").reduce((acc, t) => acc + t.amount, 0),
      transactions.filter((t) => t.category === "Taxable Expense").reduce((acc, t) => acc + t.amount, 0),
      transactions.filter((t) => t.category === "Non-Taxable").reduce((acc, t) => acc + t.amount, 0),
    ],
    options: {
      labels: ["Tax Deduction", "Taxable Expense", "Non-Taxable"],
      chart: { type: "pie" },
    },
  };

  // 🎖️ Check Milestones
  const checkMilestones = () => {
    let newBadges = [];
    if (taxSavings >= 100000) newBadges.push("Tax Guru 🏆");
    if (streak >= 5) newBadges.push("Smart Saver 💡");
    if (taxSavings > taxGoal * 0.8) newBadges.push("Goal Achiever 🎯");

    setBadges([...new Set([...badges, ...newBadges])]);
  };

  // 🎰 Spin Wheel Rewards
  const spinRewards = ["Bonus XP 🎉", "Tax Tip 💡", "Nothing 😢", "Extra Streak 🔥"];
  const spinTheWheel = () => {
    const result = spinRewards[Math.floor(Math.random() * spinRewards.length)];
    setSpinResult(result);
    setShowSpinWheel(false);
    if (result === "Bonus XP 🎉") setXp(xp + 100);
    if (result === "Extra Streak 🔥") setStreak(streak + 1);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center p-6 pt-20 transition-all`}>
      <motion.h1 className="text-4xl font-bold text-yellow-400 mb-6 flex items-center">
        <FaWallet className="mr-2" /> Smart Tax Wallet
      </motion.h1>

      {/* ☀️ Dark Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="absolute top-5 right-5 text-xl p-2 bg-gray-800 text-yellow-400 rounded-full shadow-lg">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* 🔥 Wallet Summary */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center w-full max-w-md">
        <h2 className="text-2xl font-bold">Total Tax Savings: ₹{taxSavings}</h2>
        <h3 className="text-sm text-gray-400">Goal: ₹{taxGoal}</h3>
        <div className="w-full h-2 bg-gray-600 rounded-lg mt-2 relative">
          <motion.div
            className="h-2 bg-yellow-400 rounded-lg"
            style={{ width: `${(taxSavings / taxGoal) * 100}%` }}
            animate={{ width: `${(taxSavings / taxGoal) * 100}%` }}
          ></motion.div>
        </div>
      </div>

      {/* 🎮 Gamification */}
      <div className="mt-4 flex space-x-4">
        <motion.div className="bg-gray-800 p-4 rounded-lg text-center shadow-lg">
          <h3 className="text-yellow-400 text-xl flex items-center">
            <FaBolt className="mr-2" /> Streak: {streak} Days
          </h3>
        </motion.div>
        <motion.div className="bg-gray-800 p-4 rounded-lg text-center shadow-lg">
          <h3 className="text-yellow-400 text-xl flex items-center">
            <FaAward className="mr-2" /> XP: {xp}
          </h3>
        </motion.div>
        <motion.button className="bg-green-500 text-black p-3 rounded-lg flex items-center" onClick={() => setShowSpinWheel(true)}>
          <FaGamepad className="mr-2" /> Spin Wheel
        </motion.button>
      </div>

      {showSpinWheel && <button onClick={spinTheWheel}>🎰 Spin Now</button>}
      {spinResult && <p>{spinResult}</p>}

      {/* 📊 Chart */}
      <div className="mt-6 w-full max-w-lg">
        <Chart options={chartData.options} series={chartData.series} type="pie" height="300" />
      </div>
    </div>
  );
};

export default SmartTaxWallet;
