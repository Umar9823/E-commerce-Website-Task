import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjE45rJJDz2wqWYJtAVQQP2gBcktfnBCk",
    authDomain: "ecommerece-website-9891a.firebaseapp.com",
    projectId: "ecommerece-website-9891a",
    storageBucket: "ecommerece-website-9891a.firebasestorage.app",
    messagingSenderId: "118623782907",
    appId: "1:118623782907:web:6beb53fafa07864990ad5e",
    measurementId: "G-QL3XVDZV9X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
