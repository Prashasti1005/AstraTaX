import React from "react";
import { signInWithGoogle } from "../lib/firebase";

const HeroSection = () => {
  return (
    <section className="text-center bg-gradient-to-b from-black to-gray-900 py-20 px-6">
      {/* Hero Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
        AI-Powered <span className="text-yellow-400 drop-shadow-lg">Tax Savings</span>.
        <br /> Effortless & Smart.
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
        Maximize your tax savings, automate filing, and stay compliant—effortlessly.  
        AstraTax simplifies your tax journey with intelligent AI-powered insights.
      </p>

      {/* Call-to-Action Button */}
      <button
        onClick={signInWithGoogle}
        className="mt-8 px-8 py-4 bg-yellow-500 text-black text-lg font-bold rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      >
        Get Started
      </button>

      {/* Subtle Glowing Effect */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-96 h-96 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
