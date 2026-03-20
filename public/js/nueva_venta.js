import { db } from "./firebase.js";
import { mostrarPopup } from "./popup.js"
import { addDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productosElegidos = document.getElementById("prod_seleccionados");
const productosDisponibles = document.getElementById("productos_disponibles");

let carrito = [];

function mostrarProductos() {
    onSnapshot(collection(db, "productos"), (documentos) => {

        productosDisponibles.innerHTML = "";

        documentos.forEach((documento) => {
            const producto = documento.data();

            if (!producto.cantidad == 0) {
                const fichaProducto = document.createElement("div");
                fichaProducto.className = "prod-card";
                fichaProducto.innerHTML = `
                    <img src="${producto.img}" style="width:3rem;height:auto;">
                    <h4>${producto.nombre}</h4>
                    <b>$${producto.precioCliente}</b>
                    <small>Stock: ${producto.cantidad}</small>
                `;

                fichaProducto.addEventListener("click", () => {
                    const existe = carrito.find(p => p.id === documento.id);
                    if (existe) {
                        existe.cantidad++;
                        existe.totalProducto = existe.precio * existe.cantidad;
                    } else {
                        carrito.push({
                            id: documento.id,
                            nombre: producto.nombre,
                            precio: Number(producto.precioCliente),
                            cantidad: 1,
                            totalProducto: Number(producto.precioCliente) * 1
                        });
                    }
                    mostrarSeleccionados();
                });

                productosDisponibles.appendChild(fichaProducto);
            }             
        });
    });
}

function mostrarSeleccionados() {
    if (!carrito.length) {
        productosElegidos.innerHTML = '<p style="text-align:center;color:#ccc;font-size:12px;margin-top:10px;">· Agrega productos desde el catálogo ·</p>';
        actualizarTotales(0);
        return;
    }

    productosElegidos.innerHTML = carrito.map(p => `
        <div class="cart-item">
            <span class="cart-item-name">${p.nombre}</span>
            <div class="cart-qty">
                <button class="q-btn" onclick="cambiarCantidad('${p.id}', -1)">−</button>
                <span>${p.cantidad}</span>
                <button class="q-btn" onclick="cambiarCantidad('${p.id}', 1)">+</button>
            </div>
            <span class="cart-price">$${(p.precio * p.cantidad).toFixed(2)}</span>
        </div>
    `).join("");

    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    actualizarTotales(subtotal);

    
}

function actualizarTotales(subtotal) {
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("iva").textContent = `$${iva.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
    document.getElementById("btn_cobrar").textContent = `Cobrar $${total.toFixed(2)}`;
}

window.cambiarCantidad = (id, delta) => {
    const producto = carrito.find(p => p.id === id);
    if (!producto) return;
    producto.cantidad += delta;
    producto.totalProducto = producto.precio * producto.cantidad;
    if (producto.cantidad <= 0) carrito = carrito.filter(p => p.id !== id);
    mostrarSeleccionados();
};

document.getElementById("btn_cobrar").addEventListener("click", async (e) => {

    if (!carrito.length) {
        mostrarPopup({
            encabezado: "Carrito Vacio",
            mensaje: `
                <br>
                <p>El carrito está vacío. Agregue productos antes de cobrar.</p>
            `,
            botones: [
                { texto: "Aceptar", estilo: "btn-s" }
            ]
        });
        return;
    }

    //Sumamos el precio de todos los productos registrados.
    let subtotal = 0;
    for (const p of carrito) {
        subtotal += p.precio * p.cantidad;
    }

    const nombreCliente = document.getElementById("nombre_cliente").value;
    const iva = parseFloat((subtotal * 0.16).toFixed(2));
    const total = parseFloat((subtotal + iva).toFixed(2));
    const cantidadPagada = parseFloat(document.getElementById("cantidad_pagada").value);
    const cambio = parseFloat((cantidadPagada - total).toFixed(2));

    if (cambio < 0) {

        //Popup
        mostrarPopup({
            encabezado: "Pago no completo",
            mensaje: `
                <br>
                <p>Hace falta ${cambio * -1} pesos para completar. Pida al cliente que complete la cantidad faltante.</p>
            `,
            botones: [
                { texto: "Aceptar", estilo: "btn-s" }
            ]
        });
        return;
    } else {
        const venta = {
            cliente: nombreCliente || "Sin registrar",
            productos: carrito,
            subtotal: Number(subtotal),
            iva: Number(iva),
            total: Number(total),
            cambio: Number(cambio),
            fecha: new Date().toLocaleDateString("es-MX"),
            hora: new Date().toLocaleTimeString("es-MX"),
        };

        const ventaNueva = await addDoc(collection(db, "ventas"), venta);
        const ventaID = ventaNueva.id;

        //Popup
        mostrarPopup({
            encabezado: "Venta Exitosa",
            mensaje: `
                <br>
                <p>Venta registrada correctamente con el ID: ${ventaID}. Su cambio es de $${cambio}.</p>
            `,
            botones: [
                { texto: "Aceptar", estilo: "btn-s" }
            ]
        });

        carrito = [];
        document.getElementById("nombre_cliente").value = "";
        document.getElementById("cantidad_pagada").value = "";

        mostrarSeleccionados();
    }

    
});

document.getElementById("btn_limpiar").addEventListener("click", () => {
    carrito = [];
    mostrarSeleccionados();
});

mostrarProductos();