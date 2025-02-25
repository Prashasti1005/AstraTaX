import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../lib/firebase"; // ✅ Correct Firebase import
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    skills: "",
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
      navigate("/dashboard"); // Redirect after sign up
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
        <img src="C:\Users\Prashasti Singh\google girl\astratax\frontend\src\media\4.png" alt="Sign Up" className="w-3/4 drop-shadow-lg" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-96">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Create your account</h2>
          <p className="text-gray-500 text-center mb-6">Join AstraTax and simplify your taxes!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
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
          

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center my-4 text-gray-500">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg shadow-sm transition duration-300"
          >
            <img src="/media/google-icon.png" alt="Google Logo" className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-yellow-500 font-bold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
