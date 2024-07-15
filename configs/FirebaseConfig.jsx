// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Add this line for Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAxApFIXk721AYCpyyRJjsLGETtLsTRME",
  authDomain: "mobile-app-demo-5c069.firebaseapp.com",
  projectId: "mobile-app-demo-5c069",
  storageBucket: "mobile-app-demo-5c069.appspot.com",
  messagingSenderId: "646989552018",
  appId: "1:646989552018:web:c4e38dc5d56cfabc03494b",
  measurementId: "G-9N92H7DH4W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
