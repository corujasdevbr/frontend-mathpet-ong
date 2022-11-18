// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAinMAmR3xcDIDJn6Q9pw77Wk6X0u0QMfk",
  authDomain: "matchpet-b2fe5.firebaseapp.com",
  projectId: "matchpet-b2fe5",
  storageBucket: "matchpet-b2fe5.appspot.com",
  messagingSenderId: "907473034953",
  appId: "1:907473034953:web:3e9135f2e102def85e3718",
  measurementId: "G-XEPX71JWHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;