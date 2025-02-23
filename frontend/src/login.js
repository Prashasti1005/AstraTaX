import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "./firebaseConfig";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Get Firebase token
      console.log("Firebase Token:", idToken);

      // Send token to backend
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: idToken }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(result.user);
        console.log("Backend Response:", data);
      } else {
        console.error("Login Failed:", data.detail);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <img src={user.photoURL} alt="Profile" width="100" />
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
