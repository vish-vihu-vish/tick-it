// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTlBOtIJD5gPKf02UGDi5LrjJKftuEWrI",
  authDomain: "tickit-c8e13.firebaseapp.com",
  projectId: "tickit-c8e13",
  storageBucket: "tickit-c8e13.appspot.com",
  messagingSenderId: "371587370321",
  appId: "1:371587370321:web:3de46929f048d3402e5770",
  measurementId: "G-D6R6KMJ84Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);