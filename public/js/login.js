import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("contrasena").value;

    const credenciales = await signInWithEmailAndPassword(auth, email, password);

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("contrasenaError");

    if (credenciales) {
        const usuario = credenciales.user;
        console.log("Correo:", usuario.email);
    }
});

const togglePassword = document.querySelector("#togglePassword");
const passwordInput = document.querySelector("#contrasena");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

  // Cambiar ícono
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // limpiar errores
    emailError.textContent = "";
    passwordError.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // validación simple
    if (!email) {
        emailError.textContent = "El correo es obligatorio";
        return;
    }

    if (!password) {
        passwordError.textContent = "La contraseña es obligatoria";
        return;
    }

    try {

        const credenciales = await signInWithEmailAndPassword(auth, email, password);
        const usuario = credenciales.user;

        console.log("Usuario:", usuario.email);

        window.location.href = "index.html";

    } catch (error) {

        console.log(error.code);

        if (error.code === "auth/user-not-found") {
            emailError.textContent = "Este correo no está registrado";
        }

        if (error.code === "auth/wrong-password") {
            passwordError.textContent = "La contraseña es incorrecta";
        }

        if (error.code === "auth/invalid-email") {
            emailError.textContent = "Correo inválido";
        }

    }
});

onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
        window.location.href = "index.html";
    }
});
