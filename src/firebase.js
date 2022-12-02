// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNEWRW96gsib7DNx657OxnGvNWTBAsEx0",
  authDomain: "todo-practice-e2a5c.firebaseapp.com",
  databaseURL: "https://todo-practice-e2a5c-default-rtdb.firebaseio.com",
  projectId: "todo-practice-e2a5c",
  storageBucket: "todo-practice-e2a5c.appspot.com",
  messagingSenderId: "2800056868",
  appId: "1:2800056868:web:c83a73cbe7e809c9f4b6b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)