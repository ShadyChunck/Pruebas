import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("contrasena").value;

    const credenciales = await signInWithEmailAndPassword(auth, email, password);

    if (credenciales) {
        const usuario = credenciales.user;
        console.log("Correo:", usuario.email);
    }
});

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#contrasena");

togglePassword.addEventListener("click", () => {

    const type = password.type === "password" ? "text" : "password";
    password.type = type;

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
        window.location.href = "panel_dashboard.html";
    }
});