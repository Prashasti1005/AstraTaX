import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate(); // Navigation Hook

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-600 text-center font-poppins">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-black drop-shadow-md">
          File Your <span className="text-white">Taxes Using AI </span> Today!
        </h2>
        <p className="text-lg mt-4 text-black font-medium opacity-90">
          Join thousands of users who trust <span className="font-semibold">AstraTax</span> for 
          smart, AI-powered tax filing.
        </p>
        <button
          onClick={() => navigate("/taxfiling")} // Navigates to Tax Filing Page
          className="mt-6 px-10 py-4 bg-black text-white font-bold text-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-900"
        >
          Get Started Now 🚀
        </button>
      </div>
    </section>
  );
};

export default CTA;
