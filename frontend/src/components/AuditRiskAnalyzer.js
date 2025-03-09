import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiLoader } from "react-icons/fi";
import { ShieldAlert, SearchCheck, FileBarChart } from "lucide-react";

const AuditRiskAnalyzer = () => {
  const [formData, setFormData] = useState({
    amount: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
    oldbalanceDest: "",
    newbalanceDest: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict_audit_risk/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          oldbalanceOrg: parseFloat(formData.oldbalanceOrg),
          newbalanceOrig: parseFloat(formData.newbalanceOrig),
          oldbalanceDest: parseFloat(formData.oldbalanceDest),
          newbalanceDest: parseFloat(formData.newbalanceDest),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze risk");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-4xl p-10 bg-gray-800/40 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl transform transition-all hover:scale-105 hover:shadow-yellow-500/40">
        <h2 className="text-5xl font-extrabold text-center text-yellow-400 drop-shadow-lg">
          AI-Powered Audit Risk Analyzer
        </h2>
        <p className="text-gray-300 text-center mt-4 mb-8 text-lg">
          Enter transaction details to evaluate audit risk and detect fraud.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-white">Transaction Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/70 text-white focus:ring-2 focus:ring-yellow-400 transition-all shadow-md hover:shadow-yellow-400/30"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-white">Sender's Initial Balance:</label>
            <input
              type="number"
              name="oldbalanceOrg"
              value={formData.oldbalanceOrg}
              onChange={handleChange}
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/70 text-white focus:ring-2 focus:ring-yellow-400 transition-all shadow-md hover:shadow-yellow-400/30"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-white">Sender's Balance After Transaction:</label>
            <input
              type="number"
              name="newbalanceOrig"
              value={formData.newbalanceOrig}
              onChange={handleChange}
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/70 text-white focus:ring-2 focus:ring-yellow-400 transition-all shadow-md hover:shadow-yellow-400/30"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-white">Receiver's Initial Balance:</label>
            <input
              type="number"
              name="oldbalanceDest"
              value={formData.oldbalanceDest}
              onChange={handleChange}
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/70 text-white focus:ring-2 focus:ring-yellow-400 transition-all shadow-md hover:shadow-yellow-400/30"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-white">Receiver's Balance After Transaction:</label>
            <input
              type="number"
              name="newbalanceDest"
              value={formData.newbalanceDest}
              onChange={handleChange}
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/70 text-white focus:ring-2 focus:ring-yellow-400 transition-all shadow-md hover:shadow-yellow-400/30"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-400 hover:opacity-90 transition-all rounded-lg shadow-lg hover:shadow-yellow-400/50 flex justify-center items-center"
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <FiLoader className="animate-spin text-3xl" /> : "Analyze Risk"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AuditRiskAnalyzer;
