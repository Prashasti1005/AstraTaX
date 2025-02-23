import React from "react";
import { signInWithGoogle } from "../lib/firebase";  


const HeroSection = () => {
  return (
    <section className="text-center bg-white py-16">
      <h1 className="text-4xl font-bold">AI-Powered Tax Savings. Effortless & Smart.</h1>
      <p className="mt-4 text-lg">Maximize your tax savings, automate filing, and stay compliant—effortlessly.</p>
      <button onClick={signInWithGoogle} className="bg-yellow-500 text-black px-6 py-3 rounded-md mt-6">
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;
