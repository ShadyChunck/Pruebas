import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById("cerrar_sesion").addEventListener("click", async () => {
    await signOut(auth);
});

onAuthStateChanged(auth, async (usuario) => {
    if (!usuario) 
    {
        window.location.href = "login.html";
    }
});