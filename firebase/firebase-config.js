// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getStorage, ref, uploadBytes } from 'firebase/storage';

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
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
