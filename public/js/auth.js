import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { addDoc, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const pagina = window.location.pathname.split("/").pop();

onAuthStateChanged(auth, async (usuario) => {

    if (!usuario)
    {
        if (!(pagina === "login.html")) return window.location.href = "login.html";
    }

    const usuarioActual = doc(db, "usuarios", usuario.uid);
    const usuarioDocumento = await getDoc(usuarioActual);
    const datos = usuarioDocumento.data(); //Esto obtiene TODOS los datos del documento del usuario en Firebase.

    if(datos && datos.tipo == "Administrador"){
        await addDoc(collection(db, "sesiones"), {
            uid: usuario.uid,
            email: usuario.email,
            name: datos.name,
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            timestamp: new Date()
        });
    }

    localStorage.setItem("usuarioActual", datos.tipo);
    localStorage.setItem("nombreUsuario", datos.name);


    // Para saber quien está en el sesión actual
    console.log(`Nombre: ${datos.name}`);
    console.log(`Correo: ${datos.email}`);

    document.getElementById("perfil_nombre").innerText = datos.name;
    document.getElementById("perfil_correo").innerText = datos.email;
    document.getElementById("perfil_avatar").innerText = datos.name[0];

    if (datos.tipo === "Empleado" && pagina === "agregar_empleado.html") return window.location.href = "panel_inventario.html";

    if (datos.tipo == "Administrador")
    {
        const secciones = document.getElementById("secciones");
        const seccionAdmin = document.createElement("div");
        seccionAdmin.innerHTML = `
            <p class="nav-label">Usuarios</p>
            <a id="nav-agregar-empleado" class="nav-item" href="agregar_empleado.html">Agregar Empleado</a>
        `
        secciones.appendChild(seccionAdmin);
    }

});

document.getElementById("cerrar_sesion").addEventListener("click", async () => {
    await signOut(auth);
});