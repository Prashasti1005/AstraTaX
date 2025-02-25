import React from "react";

const AboutUs = () => {
  return (
    <section className="min-h-screen py-16 px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-extrabold text-yellow-400 mb-8">About AstraTax</h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
          AstraTax is an AI-powered tax assistant that simplifies tax filing, optimizes savings, and ensures compliance 
          through smart automation. Our mission is to make tax filing stress-free and efficient for individuals and businesses.
        </p>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-12">
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-2xl font-bold text-yellow-300">🚀 Innovation</h3>
            <p className="text-gray-400 mt-2">Leveraging AI to transform tax filing and financial planning.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-2xl font-bold text-yellow-300">🛡️ Trust</h3>
            <p className="text-gray-400 mt-2">Bank-grade security and AI-driven compliance ensure user trust.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-2xl font-bold text-yellow-300">📈 Excellence</h3>
            <p className="text-gray-400 mt-2">Our AI ensures tax efficiency with precision-driven insights.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
