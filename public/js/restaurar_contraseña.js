import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("inicio_sesion");
const emailInput = document.getElementById("email").value.trim();

form.addEventListener("sumbit", async (e) => {
    e.preventDefault();

    if (!emailInput) return console.log("Sin correo");
    console.log("Correo enviado");

    try {
        await sendPasswordResetEmail(auth, correo);

        // let mensajeSpam = document.createElement("p");
        // mensajeSpam.textContent = "Se ha enviado un correo para reestablecer la contraseña. Por favor, revise su bandeja de entrada y también la carpeta de spam.";
        // mensajeSpam.style.color = "green";
        // mensajeSpam.style.textAlign = "center";
        // mensajeSpam.style.marginTop = "1rem";

        // mensaje.appendChild(mensajeSpam);
    } catch (error) {
        console.error("Error: ", error);
    }
    
});
