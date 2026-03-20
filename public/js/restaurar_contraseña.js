import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("inicio_sesion");


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email").value;
    if (!emailInput) return console.log("Sin correo");

    try {
        await sendPasswordResetEmail(auth, emailInput);
        console.log("Correo Enviado");
    } catch (error) {
        console.error("Error: ", error);
    }
    
});
