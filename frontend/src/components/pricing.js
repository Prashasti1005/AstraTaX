import React from "react";

const plans = [
  {
    name: "Free Plan",
    price: "₹0",
    features: ["Basic Tax Filing", "Limited AI Suggestions", "Community Support"],
    bgColor: "bg-gray-900/80", // Semi-transparent black
    borderColor: "border-gray-700",
  },
  {
    name: "Premium Plan",
    price: "₹999/year",
    features: ["Advanced Tax Optimization", "Audit Risk Analysis", "Priority Support"],
    bgColor: "bg-gray-800/80", // Slightly lighter dark
    borderColor: "border-yellow-400",
  },
  {
    name: "Business Plan",
    price: "₹4,999/year",
    features: ["Business Tax Filing", "Expert Consultation", "Enterprise AI Insights"],
    bgColor: "bg-gray-900/80", // Matching dark tone
    borderColor: "border-blue-400",
  }
];

const Pricing = () => {
  return (
    <section className="py-16 bg-black text-white text-center">
      {/* Section Header */}
      <h2 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
        Pricing Plans
      </h2>
      <p className="text-gray-400 mt-3 text-lg">
        Choose the plan that suits your needs.
      </p>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 mt-12">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 ${plan.bgColor} border ${plan.borderColor} rounded-2xl shadow-xl relative transform transition duration-500 hover:scale-105 hover:border-yellow-300/50`}
            style={{
              backdropFilter: "blur(8px)", // Subtle glass effect
              backgroundColor: "rgba(20, 20, 20, 0.8)", // Dark semi-transparent
            }}
          >
            {/* Highlighted Badge for Best Value Plan */}
            {plan.name === "Premium Plan" && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                Best Value 🚀
              </span>
            )}

            {/* Plan Name & Price */}
            <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
            <p className="text-3xl font-semibold my-4">{plan.price}</p>

            {/* Features List */}
            <ul className="text-gray-300 text-sm space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center space-x-2">
                  <span className="text-green-400">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="mt-4 w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300 shadow-md">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
