import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const pagina = window.location.pathname.split("/").pop();

onAuthStateChanged(auth, async (usuario) => {

    if (!usuario)
    {
        if (pagina === "panel_configuracion.html") return window.location.href = "login.html";
        if (pagina === "panel_dashboard.html") return window.location.href = "login.html";
        if (pagina === "panel_inventario.html") return window.location.href = "login.html";
        if (pagina === "panel_nueva-venta.html") return window.location.href = "login.html";
        if (pagina === "panel_nuevo_producto.html") return window.location.href = "login.html";
        if (pagina === "panel_reportes.html") return window.location.href = "login.html";
        if (pagina === "panel_ventas.html") return window.location.href = "login.html";

    } 

});

document.getElementById("cerrar_sesion").addEventListener("click", async () => {
    await signOut(auth);
});