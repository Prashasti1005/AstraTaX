import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-4xl font-bold">How It Works</h2>
      <div className="flex justify-center space-x-6 mt-8">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">1️⃣ Upload Documents 📄</h3>
          <p>Upload your invoices, salary slips, and bank statements.</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">2️⃣ AI Analyzes & Optimizes 🤖</h3>
          <p>AI extracts data and suggests deductions in real time.</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">3️⃣ File in One Click 🚀</h3>
          <p>Submit your tax return with a single click.</p>
        </div>
      </div>
      <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded">
        Try a Live Demo
      </button>
    </section>
  );
};

export default HowItWorks;
