import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAz57oDJE8pagcIrrmCg53zGbvJ82vmTvo",
    authDomain: "coachhub-2c82c.firebaseapp.com",
    databaseURL: "https://coachhub-2c82c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "coachhub-2c82c",
    storageBucket: "coachhub-2c82c.firebasestorage.app",
    messagingSenderId: "514760712164",
    appId: "1:514760712164:web:1a0a63ff080c5daedf71f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);

setPersistence(auth, browserSessionPersistence)
    .then(() => {
    })
    .catch((error) => {
        console.error("Failed to set persistence:", error);
    });

export { app, auth };