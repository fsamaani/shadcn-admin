// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClWqa4765g3JLN-8rFp44m5kklExN4yi4",
  authDomain: "admin-139b4.firebaseapp.com",
  projectId: "admin-139b4",
  storageBucket: "admin-139b4.firebasestorage.app",
  messagingSenderId: "171178287449",
  appId: "1:171178287449:web:6753cb806b8b3791b1ac48",
  measurementId: "G-KZC394YFXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
