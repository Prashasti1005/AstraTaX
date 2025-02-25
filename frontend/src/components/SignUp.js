import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Account Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] font-poppins">
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center">Create Your AstraTax Account</h2>
        <p className="text-gray-400 text-center mb-6">Simplify your taxes with AI-powered insights.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center my-4 text-gray-400">— OR —</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white/20 border border-gray-500 hover:border-yellow-400 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 hover:bg-yellow-500 hover:text-black transform hover:scale-105"
        >
          <img src="/media/google-icon.png" alt="Google Logo" className="w-5 h-5" />
          Sign up with Google
        </button>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-yellow-400 font-bold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
