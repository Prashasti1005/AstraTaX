import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Signed in Successfully!");
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
        <h2 className="text-3xl font-bold text-white text-center">Sign in to AstraTax</h2>
        <p className="text-gray-400 text-center mb-6">Your AI-powered tax assistant awaits.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-yellow-500" /> <span>Remember me</span>
            </label>
            <a href="#" className="text-yellow-400 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="text-center my-4 text-gray-400">— OR —</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white/20 border border-gray-500 hover:border-yellow-400 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 hover:bg-yellow-500 hover:text-black transform hover:scale-105"
        >
          <img src="/media/google-icon.png" alt="Google Logo" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-yellow-400 font-bold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
