import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase"; // Firebase config
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "", role: "", skills: "" });
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
        <img src="/signup-illustration.png" alt="Sign Up" className="w-3/4" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h2 className="text-3xl font-bold">Create your account</h2>
        <p className="text-gray-600 mb-6">Join AstraTax and simplify your taxes!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="input" required />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />
          <select name="role" onChange={handleChange} className="input" required>
            <option value="">Select Role</option>
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
          <input type="text" name="skills" placeholder="Skills (Optional)" onChange={handleChange} className="input" />

          <button type="submit" className="btn-primary">Sign Up</button>
        </form>

        <div className="text-center my-4">or</div>

        <button onClick={handleGoogleSignIn} className="btn-google">Login with Google</button>
        <p className="mt-4 text-center">
          Already have an account? <a href="/signin" className="text-blue-500">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
