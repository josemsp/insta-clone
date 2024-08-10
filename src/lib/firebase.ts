import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// import { seedDatabase } from "../seed";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_APP_FIREBASE_API_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_APP_FIREBASE_API_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_FIREBASE_API_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_APP_FIREBASE_API_MESSAGING,
  // appId: import.meta.env.VITE_APP_FIREBASE_API_APP_ID
  apiKey: Cypress.env('VITE_APP_FIREBASE_API_KEY') || import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: Cypress.env('VITE_APP_FIREBASE_API_AUTH_DOMAIN') || import.meta.env.VITE_APP_FIREBASE_API_AUTH_DOMAIN,
  projectId: Cypress.env('VITE_APP_FIREBASE_API_PROJECT_ID') || import.meta.env.VITE_APP_FIREBASE_API_PROJECT_ID,
  storageBucket: Cypress.env('VITE_APP_FIREBASE_API_STORAGE_BUCKET') || import.meta.env.VITE_APP_FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: Cypress.env('VITE_APP_FIREBASE_API_MESSAGING') || import.meta.env.VITE_APP_FIREBASE_API_MESSAGING,
  appId: Cypress.env('VITE_APP_FIREBASE_API_APP_ID') || import.meta.env.VITE_APP_FIREBASE_API_APP_ID
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);
// seedDatabase(db)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebase);

export const storage = getStorage(firebase);
