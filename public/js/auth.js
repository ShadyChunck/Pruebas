import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
//import { createElement } from "react";

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

        // const accionesVentas = document.getElementById("tablaVentas");
        // const btn_eliminar = document.createElement("td");
        //     btn_eliminar.style = "display: flex; gap:5px; align-items: center; justify-content: center;";
        //     btn_eliminar.innerHTML = `
        //         <button class="btn btn-d" style="padding:4px 9px;font-size:12px" id="btn_eliminar" data-id="${documento.id}" data-nombre="${venta.nombre}" data-accion="eliminar">Eliminar</button>
        //     `;
        // accionesVentas.appendChild(btn_eliminar);
    }

});

document.getElementById("cerrar_sesion").addEventListener("click", async () => {
    await signOut(auth);
});