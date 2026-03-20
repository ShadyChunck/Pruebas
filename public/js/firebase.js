// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCK79FXbS3tNPL8V6C03HOMyrr8-rp6YO4",
    authDomain: "autopartes-hessman-68283.firebaseapp.com",
    projectId: "autopartes-hessman-68283",
    storageBucket: "autopartes-hessman-68283.firebasestorage.app",
    messagingSenderId: "854961822123",
    appId: "1:854961822123:web:75d5b5d3d3e567761e9aee",
    measurementId: "G-ENNB0G1JME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
//Este codigo ha sido proporcionado por Firebase Console en la sección de ajustes.