// Firebase v9 modular SDK setup — carried over from the existing app's
// firebase-config.js so Auth/Firestore keep pointing at the same project
// (same users, same "posts" data still readable from the old app).
//
// Firebase web config values are not secret; access is controlled by your
// Firestore Security Rules and (optionally) API key restrictions in the
// Google Cloud Console — not by hiding this file. Still, for a cleaner
// setup we read from Vite env vars first and fall back to the literal
// values so the app works out of the box. See .env.example.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAAAwsxAUiI8AVAWqs4hk399-N1BBOXIZQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "blogapp-a64c0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blogapp-a64c0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blogapp-a64c0.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "350390881066",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:350390881066:web:366dc32789a721e2f66c53",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
