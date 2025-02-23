import React from "react";

const plans = [
  {
    name: "Free Plan",
    price: "₹0",
    features: ["Basic Tax Filing", "Limited AI Suggestions", "Community Support"],
  },
  {
    name: "Premium Plan",
    price: "₹999/year",
    features: ["Advanced Tax Optimization", "Audit Risk Analysis", "Priority Support"],
  },
  {
    name: "Business Plan",
    price: "₹4,999/year",
    features: ["Business Tax Filing", "Expert Consultation", "Enterprise AI Insights"],
  }
];

const Pricing = () => {
  return (
    <section className="py-12 bg-black text-white text-center">
      <h2 className="text-4xl font-bold">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 mt-8">
        {plans.map((plan, index) => (
          <div key={index} className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-2xl font-semibold my-3">{plan.price}</p>
            <ul className="text-gray-400">
              {plan.features.map((feature, i) => (
                <li key={i} className="mt-2">✔ {feature}</li>
              ))}
            </ul>
            <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
