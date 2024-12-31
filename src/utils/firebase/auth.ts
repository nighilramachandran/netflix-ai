import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixai-b15f2.firebaseapp.com",
  projectId: "netflixai-b15f2",
  storageBucket: "netflixai-b15f2.firebasestorage.app",
  messagingSenderId: "965881209017",
  appId: "1:965881209017:web:f82104f74f1c4f4423fb68",
  measurementId: "G-VC74TG8RVY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
