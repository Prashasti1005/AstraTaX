import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 bg-black text-white text-center">
      <p className="text-gray-400">© 2025 AstraTax. All rights reserved.</p>
      <div className="mt-4 space-x-6">
        <Link to="/privacy" className="text-gray-400 hover:text-yellow-400 transition duration-300">
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-gray-400 hover:text-yellow-400 transition duration-300">
          Terms of Service
        </Link>
        <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition duration-300">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
