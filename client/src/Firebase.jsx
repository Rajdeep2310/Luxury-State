// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-auth-5d6fe.firebaseapp.com",
  projectId: "mern-estate-auth-5d6fe",
  storageBucket: "mern-estate-auth-5d6fe.appspot.com",
  messagingSenderId: "905172322626",
  appId: "1:905172322626:web:50a767d142cffeeab6e0db"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);