// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG2531-LcHQLe5rz_qHtRCdIHtrF1rBG8",
  authDomain: "talentiq-4fde6.firebaseapp.com",
  projectId: "talentiq-4fde6",
  storageBucket: "talentiq-4fde6.firebasestorage.app",
  messagingSenderId: "510655506896",
  appId: "1:510655506896:web:a9fef954668bad870bf1d5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
export default auth;