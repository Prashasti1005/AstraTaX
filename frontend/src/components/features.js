import React from "react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate(); // Navigation Hook

  // Features List with Navigation
  const features = [
    {
      title: "AI-Powered Tax Optimization 📊",
      description: "Find every possible deduction and reduce tax liability using AI.",
      path: "/tax-optimization"
    },
    {
      title: "Automated Tax Filing ⚡",
      description: "Auto-fill and file your taxes with a click.",
      path: "/auto-filing"
    },
    {
      title: "Smart Tax Wallet 💰",
      description: "Real-time tax tracking & categorized savings.",
      path: "/smart-wallet"
    },
    {
      title: "Audit Risk Analyzer 🔍",
      description: "Predict & avoid tax audit risks effortlessly.",
      path: "/audit-analyzer"
    },
    {
      title: "AI-Powered Tax Advocacy 🤖",
      description: "Get AI-backed legal arguments for tax deductions.",
      path: "/ai-chatbot",
      
    },
    {
      title: "Crowdsourced Tax Insights 📢",
      description: "Compare your tax savings with anonymized users.",
      path: "/crowdsourced-insights"
    }
  ];

  return (
    <section className="py-16 bg-gray-950 text-white">
      {/* Heading */}
      <h2 className="text-center text-5xl font-extrabold text-yellow-400 leading-snug">
        Why Choose <span className="text-white">AstraTax?</span>
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 mt-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            onClick={() => navigate(feature.path)} 
            className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-yellow-500">{feature.title}</h3>
            <p className="text-gray-300 mt-3">{feature.description}</p>

            {feature.buttonText && (
              <button
                className="mt-6 bg-yellow-500 text-black px-5 py-3 rounded-md font-semibold hover:bg-yellow-600 transition-all"
              >
                {feature.buttonText}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
