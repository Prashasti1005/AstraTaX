import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold">
        ASTRA<span className="italic">Tax</span>
      </h1>
      <div className="space-x-6">
        <a href="#" className="text-gray-600 hover:text-black">Explore</a>
        <a href="#" className="text-gray-600 hover:text-black">About</a>
        <a href="#" className="text-gray-600 hover:text-black">Contact</a>
      </div>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded">Sign Up</button>
        <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
