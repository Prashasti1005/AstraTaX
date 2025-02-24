import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../lib/firebase"; // ✅ Fix the import path
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
      await signInWithPopup(auth, googleProvider);
      alert("Signed in with Google!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-yellow-500 flex justify-center items-center">
        <img src="/signin-illustration.png" alt="Sign In" className="w-3/4" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h2 className="text-3xl font-bold">Sign in</h2>
        <p className="text-gray-600 mb-6">Welcome back to AstraTax!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-500">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        <div className="text-center my-4">or</div>

        <button onClick={handleGoogleSignIn} className="btn-google">Login with Google</button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
