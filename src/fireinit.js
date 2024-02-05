// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8Zm7_1DljyTxB4OsHXNc35-IPhryimCI",
  authDomain: "subsaloon-472fe.firebaseapp.com",
  projectId: "subsaloon-472fe",
  storageBucket: "subsaloon-472fe.appspot.com",
  messagingSenderId: "120619728102",
  appId: "1:120619728102:web:2fa0b0a7f521a811aa0f27",
  measurementId: "G-LYS19YEQ5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default analytics;