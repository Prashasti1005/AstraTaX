import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, SearchCheck, FileBarChart } from "lucide-react";

const auditFeatures = [
  {
    title: "Fraud Detection",
    description: "AI-powered fraud risk scoring & anomaly detection.",
    icon: <ShieldAlert size={48} className="text-yellow-400" />,
  },
  {
    title: "Real-Time Audit",
    description: "Instant tax health analysis with AI-powered insights.",
    icon: <SearchCheck size={48} className="text-green-400" />,
  },
  {
    title: "Risk Insights",
    description: "AI-driven risk profiling for better tax planning.",
    icon: <FileBarChart size={48} className="text-blue-400" />,
  }
];

const AuditSection = () => {
  const navigate = useNavigate(); // React Router Navigation Hook

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-white text-center">
      {/* Section Heading */}
      <h2 className="text-5xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">
        AI-Powered Audit Risk Analysis
      </h2>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12 mt-12">
        {auditFeatures.map((feature, index) => (
          <div
            key={index}
            className="relative p-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700 shadow-lg rounded-xl max-w-sm mx-auto transform transition hover:scale-105 hover:shadow-xl"
          >
            {/* Icon */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-full shadow-md border border-gray-700">
              {feature.icon}
            </div>

            {/* Content */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
              <p className="text-gray-300 mt-4 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <button
        onClick={() => navigate("/audit-risk-analyzer")}
        className="mt-14 px-10 py-4 text-lg font-semibold tracking-wide rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all shadow-2xl hover:shadow-cyan-400/50"
      >
        Analyze My Risk →
      </button>
    </section>
  );
};

export default AuditSection;
