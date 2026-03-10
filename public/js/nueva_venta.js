import { db } from "./firebase.js";
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
        alert("El carrito está vacío.");
        return;
    }

    //Sumamos el precio de todos los productos registrados.
    let subtotal = 0;
    for (const p of carrito) {
        subtotal += p.precio * p.cantidad;
    }

    const nombreCliente = document.getElementById("nombre_cliente").value;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    const cantidadPagada = Number(document.getElementById("cantidad_pagada").value);
    const cambio = cantidadPagada - total;

    if (cambio < 0) {
        alert(`Hace falta ${cambio * -1} pesos para completar`);
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

        await addDoc(collection(db, "ventas"), venta);
        alert(`Venta registrada correctamente. Su cambio es de $${cambio}.`);

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



// nueva-venta.js
// ignorar

// document.getElementById('btn_cobrar').addEventListener('click', async () => {

//   const nombreCliente = document.getElementById("nombre_cliente").value;
//   const subTotal = document.getElementById("subtotal").value;
//   const iva = document.getElementById("iva").value;
//   const total = document.getElementById("total").value;



//   const venta = {
    
//   };

//   await addDoc(collection(db, "productos"), producto);
//   alert("Producto agregado");
//   window.location.href = 'panel_inventario.html';

// });



// function render() {
//   if (!carrito.length) {
//     itemsEl.innerHTML = '<p style="text-align:center;color:#ccc;font-size:12px;margin-top:10px;">· Agrega productos desde el catálogo ·</p>';
//     actualizar(0); return;
//   }
//   itemsEl.innerHTML = carrito.map(p => `
//     <div class="cart-item">
//       <span class="cart-item-name">${p.emo} ${p.nombre}</span>
//       <div class="cart-qty">
//         <button class="q-btn" onclick="cambiar('${p.id}',-1)">−</button>
//         <span>${p.qty}</span>
//         <button class="q-btn" onclick="cambiar('${p.id}',1)">+</button>
//       </div>
//       <span class="cart-price">$${(p.precio * p.qty).toFixed(2)}</span>
//     </div>`).join('');
//   actualizar(carrito.reduce((s, p) => s + p.precio * p.qty, 0));
// }

// function actualizar(sub) {
//   const iva = sub * IVA, total = sub + iva;
//   lblSub.textContent   = `$${sub.toFixed(2)}`;
//   lblIva.textContent   = `$${iva.toFixed(2)}`;
//   lblTotal.textContent = `$${total.toFixed(2)}`;
//   btnCobrar.textContent = `✅ Cobrar $${total.toFixed(2)}`;
// }

// window.agregar = (id, nombre, emo, precio) => {
//   const p = carrito.find(x => x.id === id);
//   p ? p.qty++ : carrito.push({ id, nombre, emo, precio, qty: 1 });
//   render();
// };

// window.cambiar = (id, d) => {
//   const p = carrito.find(x => x.id === id);
//   if (!p) return;
//   p.qty += d;
//   if (p.qty <= 0) carrito = carrito.filter(x => x.id !== id);
//   render();
// };

// document.getElementById('btn-limpiar').addEventListener('click', () => { carrito = []; render(); });

// btnCobrar.addEventListener('click', () => {
//   if (!carrito.length) { alert('El carrito está vacío.'); return; }
//   // TODO: integrar con Firebase
//   alert('Venta registrada.');
//   carrito = []; render();
// });

// render();
