// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcjzoErPAkiarV3ozGkNlafqyX7IL8iH4",
    authDomain: "autopartes-hessman.firebaseapp.com",
    projectId: "autopartes-hessman",
    storageBucket: "autopartes-hessman.firebasestorage.app",
    messagingSenderId: "376837922284",
    appId: "1:376837922284:web:ebee8b025e4538099034c9",
    measurementId: "G-BKH5JHF9W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
