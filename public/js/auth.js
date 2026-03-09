import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const pagina = window.location.pathname.split("/").pop();

onAuthStateChanged(auth, async (usuario) => {

    if (!usuario)
    {
        if (!(pagina === "login.html")) return window.location.href = "login.html";
    }

    const usuarioActual = doc(db, "usuarios", usuario.uid);
    const usuarioDocumento = await getDoc(usuarioActual);
    const datos = usuarioDocumento.data(); //Esto obtiene TODOS los datos del documento del usuario en Firebase.

    // Para saber quien está en el sesión actual
    console.log(`Nombre: ${datos.name}`);
    console.log(`Correo: ${datos.email}`);

    document.getElementById("perfil_nombre").innerText = datos.name;
    document.getElementById("perfil_correo").innerText = datos.email;
    document.getElementById("perfil_avatar").innerText = datos.name[0];

});

document.getElementById("cerrar_sesion").addEventListener("click", async () => {
    await signOut(auth);
});