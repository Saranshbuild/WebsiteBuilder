// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "dora-ai-2d13e.firebaseapp.com",
  projectId: "dora-ai-2d13e",
  storageBucket: "dora-ai-2d13e.firebasestorage.app",
  messagingSenderId: "650981644074",
  appId: "1:650981644074:web:fa845686934c5d2d24b053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()


