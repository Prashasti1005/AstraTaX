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
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Tax Calculator</h2>
      <input
        type="number"
        placeholder="Annual Income (₹)"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        placeholder="Deductions (₹)"
        value={deductions}
        onChange={(e) => setDeductions(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />
      <select
        value={regime}
        onChange={(e) => setRegime(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      >
        <option value="new">New Tax Regime</option>
        <option value="old">Old Tax Regime</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Calculate Tax
      </button>
    </form>
  );
};

export default TaxForm;
