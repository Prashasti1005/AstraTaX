import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGV-v9JJAW4J4jqLnltX5LMAwDsIwReOQ",
  authDomain: "astratax-d0104.firebaseapp.com",
  projectId: "astratax-d0104",
  storageBucket: "astratax-d0104.firebasestorage.app",
  messagingSenderId: "119553239856",
  appId: "1:119553239856:web:4050b02ed5611fe920b6f5",
  measurementId: "G-M24EVF9N7V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
    });
};

export { auth };