// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3akU4lfkiO_PhizYyYnQKAFgFT1RhTIk",
  authDomain: "smartshift-1b42a.firebaseapp.com",
  projectId: "smartshift-1b42a",
  storageBucket: "smartshift-1b42a.appspot.com",
  messagingSenderId: "644210647722",
  appId: "1:644210647722:web:21787661247e5f8028a6d3",
  measurementId: "G-RR243Z7ND8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
