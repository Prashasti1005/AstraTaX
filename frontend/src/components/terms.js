import React from "react";

const TermsOfService = () => {
  return (
    <section className="min-h-screen py-20 px-8 bg-black text-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-yellow-500 opacity-20 blur-2xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg text-center">
          Terms of Service
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mt-6 text-center">
          Welcome to AstraTax. By using our AI-powered tax optimization platform, you agree to the following terms.
        </p>

        {/* Terms Content */}
        <div className="mt-16 space-y-12">
          {/* User Responsibilities */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h2 className="text-3xl font-semibold text-yellow-400">📌 1. User Responsibilities</h2>
            <p className="text-gray-400 mt-4 text-lg">
              Users must provide accurate financial details. AstraTax is not liable for any inaccuracies in tax filings.
            </p>
          </div>

          {/* AI Assistance Disclaimer */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h2 className="text-3xl font-semibold text-yellow-400">🤖 2. AI Assistance Disclaimer</h2>
            <p className="text-gray-400 mt-4 text-lg">
              Our AI provides insights but does not replace professional tax consultation. Users should review all AI suggestions before filing.
            </p>
          </div>

          {/* Prohibited Activities */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h2 className="text-3xl font-semibold text-yellow-400">🚫 3. Prohibited Activities</h2>
            <p className="text-gray-400 mt-4 text-lg">
              Misuse of AstraTax for fraudulent tax filings or data tampering will result in permanent account suspension.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <p className="mt-16 text-gray-500 text-center text-lg">
          For more details, contact us at{" "}
          <span className="text-yellow-400 font-semibold">legal@astratax.ai</span>.
        </p>
      </div>
    </section>
  );
};

export default TermsOfService;
