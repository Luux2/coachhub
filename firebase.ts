import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAz57oDJE8pagcIrrmCg53zGbvJ82vmTvo",
    authDomain: "coachhub-2c82c.firebaseapp.com",
    projectId: "coachhub-2c82c",
    storageBucket: "coachhub-2c82c.firebasestorage.app",
    messagingSenderId: "514760712164",
    appId: "1:514760712164:web:1a0a63ff080c5daedf71f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };