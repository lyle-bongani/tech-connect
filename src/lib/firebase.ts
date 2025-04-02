// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCaSNHaWjZyTKL7tZLKzN5YnXbXKoZMM8",
  authDomain: "tech-connect-469c7.firebaseapp.com",
  projectId: "tech-connect-469c7",
  storageBucket: "tech-connect-469c7.firebasestorage.app",
  messagingSenderId: "910311971615",
  appId: "1:910311971615:web:b61f4d435a7184f2e82e2a",
  measurementId: "G-CZJ4E8HP59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);