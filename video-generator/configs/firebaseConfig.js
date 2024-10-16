// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_API_KEY,
  authDomain: "video-generator-5a9a4.firebaseapp.com",
  projectId: "video-generator-5a9a4",
  storageBucket: "video-generator-5a9a4.appspot.com",
  messagingSenderId: "418618407859",
  appId: "1:418618407859:web:8fb8c7a900025325e6a9c6",
  measurementId: "G-9TTQ15YLX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };