import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero";
import FeaturesSection from "./components/features";
import HowItWorks from "./components/howitworks";
import Testimonials from "./components/testimonials";
import Pricing from "./components/pricing";
import CTA from "./components/CTA";
import Footer from "./components/footer";
import TaxForm from "./components/taxform";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AIChatbot from "./components/AIChatbot";

// ✅ Import the missing pages
import PrivacyPolicy from "./components/privacy";
import TermsOfService from "./components/terms";
import ContactUs from "./components/contact";

function HomePage({ handleTaxCalculation, taxResult, taxError }) {
  return (
    <div className="bg-black text-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <TaxForm onSubmit={handleTaxCalculation} />

      {/* Show Tax Result if Available */}
      {taxResult && (
        <div className="text-center p-4 bg-gray-900 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-yellow-400">
            Estimated Tax: ₹{taxResult.tax}
          </h2>
          <p className="mt-4 text-md font-medium">💡 Tax-saving Tips:</p>
          <p className="text-sm text-gray-400">{taxResult.suggestion}</p>
        </div>
      )}

      {/* Show Error if Tax Calculation Fails */}
      {taxError && (
        <div className="text-center p-4 bg-red-800 mt-6 rounded-lg">
          <h2 className="text-lg font-semibold">⚠️ Error: {taxError}</h2>
        </div>
      )}

      <CTA />
    </div>
  );
}

function App() {
  const [taxResult, setTaxResult] = useState(null);
  const [taxError, setTaxError] = useState(null);

  const handleTaxCalculation = async (formData) => {
    try {
      setTaxError(null);
      setTaxResult(null);

      const response = await fetch("http://127.0.0.1:8000/calculate-tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to calculate tax");

      const data = await response.json();
      setTaxResult(data);
    } catch (error) {
      console.error("Error:", error);
      setTaxError("Tax calculation failed. Please try again.");
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleTaxCalculation={handleTaxCalculation}
              taxResult={taxResult}
              taxError={taxError}
            />
          }
        />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* ✅ Add missing routes */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer /> {/* ✅ Footer appears only once here */}
    </Router>
  );
}

export default App;
