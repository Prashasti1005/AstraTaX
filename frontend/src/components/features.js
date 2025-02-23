import React from "react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate(); // Navigation hook

  const features = [
    {
      title: "AI-Powered Tax Optimization 📊",
      description: "Find every possible deduction and reduce tax liability using AI.",
    },
    {
      title: "Automated Tax Filing ⚡",
      description: "Auto-fill and file your taxes with a click.",
    },
    {
      title: "Smart Tax Wallet 💰",
      description: "Real-time tax tracking & categorized savings.",
    },
    {
      title: "Audit Risk Analyzer 🔍",
      description: "Predict & avoid tax audit risks effortlessly.",
    },
    {
      title: "AI-Powered Tax Advocacy 🤖",
      description: "Get AI-backed legal arguments for tax deductions.",
      buttonText: "Ask AI",
      onClick: () => window.location.href = "/ai-chatbot" // ✅ Fix navigation issue
    }
    ,
    {
      title: "Crowdsourced Tax Insights 📢",
      description: "Compare your tax savings with anonymized users.",
    }
  ];

  return (
    <section className="py-12 bg-black text-white">
      <h2 className="text-center text-4xl font-bold">Why Choose AstraTax?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 mt-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
            {feature.buttonText && feature.onClick && (
              <button
                onClick={feature.onClick}
                className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600"
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
