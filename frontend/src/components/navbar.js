import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-black/80 backdrop-blur-md shadow-lg fixed top-0 w-full z-50 border-b border-gray-800">
      {/* Brand Logo */}
      <h1 className="text-3xl font-extrabold text-white tracking-wide">
        ASTRA<span className="italic text-yellow-400 drop-shadow-lg">Tax</span>
      </h1>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/home" className="text-gray-300 font-medium hover:text-yellow-400 transition-all duration-300">
          Home
        </Link>
        <Link to="/about" className="text-gray-300 font-medium hover:text-yellow-400 transition-all duration-300">
          About
        </Link>
        <Link to="/contact" className="text-gray-300 font-medium hover:text-yellow-400 transition-all duration-300">
          Contact
        </Link>
      </div>

      {/* Sign In & Sign Up Buttons */}
      <div className="space-x-4">
        <Link to="/SignIn">
          <button className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            Sign In
          </button>
        </Link>
        <Link to="/SignUp">
          <button className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
