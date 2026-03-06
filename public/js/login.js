import { auth } from "./firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("inicio_sesion");
const emailInput = document.getElemGIentById("email");
const passwordInput = document.getElementById("contrasena");
const passwordError = document.getElementById("contrasenaError");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    passwordError.textContent = "";

    try {

        const credenciales = await signInWithEmailAndPassword(auth, email, password);

        if (credenciales) {
            console.log("Correo:", credenciales.user.email);
            window.location.href = "index.html";
        }

    } catch (error) {

        passwordError.textContent = "Correo o contraseña incorrecta";

    }
});


// VER / OCULTAR CONTRASEÑA
const togglePassword = document.querySelector("#togglePassword");

togglePassword.addEventListener("click", () => {

    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");

});


// SI YA ESTÁ LOGUEADO
onAuthStateChanged(auth, (usuario) => {
    if (usuario) {
        window.location.href = "index.html";
    }
});