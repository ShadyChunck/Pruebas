const overlay = document.getElementById("popup");
const titulo = document.getElementById("popup-titulo");
const cuerpo = document.getElementById("popup-cuerpo");
const acciones = document.getElementById("popup-acciones");

const pagina = window.location.pathname.split("/").pop();

export function mostrarPopup({ encabezado, mensaje, botones }) {
    titulo.textContent = encabezado;
    cuerpo.innerHTML = mensaje;

    acciones.innerHTML = "";

    botones.forEach(btn => {
        const boton = document.createElement("button");
        boton.textContent = btn.texto;
        boton.className   = `btn ${btn.estilo ?? "btn-s"}`;
        boton.addEventListener("click", () => {
            cerrarPopup();
            btn.accion?.();
        });
        acciones.appendChild(boton);
    });

    overlay.classList.add("activo");
}

export function cerrarPopup() {
    overlay.classList.remove("activo");
}

if (pagina === "panel_ventas.html")
{
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) cerrarPopup();
    });
}
