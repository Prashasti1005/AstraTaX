import React from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero";
import FeaturesSection from "./components/features";
import HowItWorks from "./components/howitworks";
import Testimonials from "./components/testimonials";
import Pricing from "./components/pricing";
import CTA from "./components/CTA";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar /> {/* ✅ Navigation Bar */}
      <HeroSection /> {/* ✅ Hero Section */}
      <FeaturesSection /> {/* ✅ Features Section */}
      <HowItWorks /> {/* ✅ How It Works Section */}
      <Testimonials /> {/* ✅ Testimonials Section */}
      <Pricing /> {/* ✅ Pricing Plans */}
      <CTA /> {/* ✅ Call to Action */}
      <Footer /> {/* ✅ Footer */}
    </div>
  );
}

export default App;
