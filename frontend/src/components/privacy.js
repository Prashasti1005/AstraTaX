import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen py-20 px-8 bg-black text-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-yellow-500 opacity-20 blur-2xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mt-6 text-center">
          Your privacy is our top priority. AstraTax ensures that all user data is securely encrypted and processed with
          the highest level of confidentiality.
        </p>

        {/* Privacy Policy Content */}
        <div className="mt-16 space-y-12">
          {/* Data Collection */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h2 className="text-3xl font-semibold text-yellow-400">📂 1. Data Collection</h2>
            <p className="text-gray-400 mt-4 text-lg">
              We collect only the necessary data, including uploaded tax documents and financial details, solely for
              providing AI-powered tax assistance.
            </p>
          </div>

          {/* Data Security */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h2 className="text-3xl font-semibold text-yellow-400">🔒 2. Data Security</h2>
            <p className="text-gray-400 mt-4 text-lg">
              Your data is encrypted using bank-grade security and stored on secure cloud infrastructure, ensuring
              protection against unauthorized access.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h2 className="text-3xl font-semibold text-yellow-400">🌐 3. Third-Party Services</h2>
            <p className="text-gray-400 mt-4 text-lg">
              We integrate Google services (Gemini AI, Cloud Vision, BigQuery ML) for AI-powered tax insights while
              adhering to their strict privacy policies.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <p className="mt-16 text-gray-500 text-center text-lg">
          For any privacy-related concerns, contact us at{" "}
          <span className="text-yellow-400 font-semibold">support@astratax.ai</span>.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
