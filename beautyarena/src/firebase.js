// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfzXtUDo0iun-U7_KMJbNgAjSA6dk8V8c",
  authDomain: "salon-beauty-arena.firebaseapp.com",
  projectId: "salon-beauty-arena",
  storageBucket: "salon-beauty-arena.firebasestorage.app",
  messagingSenderId: "1077145414594",
  appId: "1:1077145414594:web:25a4b2194eddcf5363045b",
  measurementId: "G-77DDG0VNND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;