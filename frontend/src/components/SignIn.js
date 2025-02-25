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
    <div className="flex h-screen bg-gradient-to-br from-yellow-400 to-orange-500 font-poppins">
      {/* Left Side */}
      <div className="w-1/2 flex justify-center items-center">
        <img src="\src\media\4.png" alt="Sign In" className="w-3/4 drop-shadow-lg" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-96">
          <h2 className="text-4xl font-bold text-gray-800 text-center">Sign in</h2>
          <p className="text-gray-500 text-center mb-6">Welcome back to AstraTax!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-yellow-500" /> <span>Remember me</span>
              </label>
              <a href="#" className="text-yellow-500 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="text-center my-4 text-gray-500">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg shadow-sm transition duration-300"
          >
            <img src="/media/google-icon.png" alt="Google Logo" className="w-5 h-5" />
            Login with Google
          </button>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <a href="/signup" className="text-yellow-500 font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
