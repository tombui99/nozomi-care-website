// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5ngD8bwS3434H6pbPbiiE_qX7nU3ldmw",
  authDomain: "nozomi-website-9d906.firebaseapp.com",
  projectId: "nozomi-website-9d906",
  storageBucket: "nozomi-website-9d906.firebasestorage.app",
  messagingSenderId: "925118144171",
  appId: "1:925118144171:web:f2d3589fbeb5d206bba1ee",
  measurementId: "G-XJL8DBXN10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
