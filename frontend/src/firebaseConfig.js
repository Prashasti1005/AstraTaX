// frontend/src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGV-v9JJAW4J4jqLnltX5LMAwDsIwReOQ",
  authDomain: "astratax-d0104.firebaseapp.com",
  projectId: "astratax-d0104",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const API_BASE_URL = "http://127.0.0.1:8000";


export { auth, provider, signInWithPopup };
