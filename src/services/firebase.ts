// Firebase configuration and exports
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKBFtjOj6gfI6IKrOSfK00nuNMZ9uiusQ",
  authDomain: "dailythirukkural.firebaseapp.com",
  projectId: "dailythirukkural",
  storageBucket: "dailythirukkural.firebasestorage.app",
  messagingSenderId: "269544830750",
  appId: "1:269544830750:web:f18028fc8fd4906e383b0f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore export
export const db = getFirestore(app);

export default app;
