import { db } from "./firebase.js";
import { mostrarPopup } from "./popup.js";
import { doc, getDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


function mostrarVentas() {
    const tablaVentas = document.getElementById("tablaVentas");

    onSnapshot(collection(db, ("ventas")), (documentos) => {
        tablaVentas.innerHTML = "";
        try {
            documentos.forEach((documento) => {
                if (!(documento.id == "ganancias"))
                {
                    const venta = documento.data();

                    const trFila = document.createElement("tr");

                    //Declarar los atributos de la tabla
                    const tdIDVenta = document.createElement("td");
                    tdIDVenta.innerText = documento.id;

                    const tdFecha = document.createElement("td");
                    tdFecha.innerText = venta.fecha;

                    const tdCliente = document.createElement("td");
                    tdCliente.innerText = venta.cliente;

                    const tdProductos = document.createElement("td");
                    tdProductos.innerText = Number(venta.productos.length); //Mas adelante

                    const tdSubtotal = document.createElement("td");
                    tdSubtotal.innerText = `$${venta.subtotal}`;

                    const tdTotal = document.createElement("td");
                    tdTotal.innerText = `$${venta.total}`;

                    const tdEstado = document.createElement("td");
                    //Verificar que si se inserten bien
                    if (Number(venta.total))
                    {
                        tdEstado.innerHTML = `
                        <span class="badge b-green">Pagado</span>
                        `;
                    } else {
                        tdEstado.innerHTML = `
                        <span class="badge b-red">Pendiente</span>
                        `;
                    }

                    const tdBotones = document.createElement("td");
                    tdBotones.style = "display: flex; gap:5px; align-items: center; justify-content: center;";
                    tdBotones.innerHTML = `
                        <button class="btn btn-s" style="padding:4px 9px;font-size:12px" data-id="${documento.id}" data-accion="detalles">Ver Detalles</button>
                    `;

                    trFila.appendChild(tdIDVenta);
                    trFila.appendChild(tdFecha);
                    trFila.appendChild(tdCliente);
                    trFila.appendChild(tdProductos);
                    trFila.appendChild(tdSubtotal);
                    trFila.appendChild(tdTotal);
                    trFila.appendChild(tdEstado);
                    trFila.appendChild(tdBotones);
                    
                    tablaVentas.appendChild(trFila);
                    console.log(`Fila Insertada: ${documento.id}`);
                }
            });

        } catch (e) {

        }
    });

    tablaVentas.addEventListener("click", async (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        // Obtener id y accion del producto
        const id = btn.dataset.id;
        const info = await getDoc(doc(db, "ventas", id));
        const detalle = info.data();
        const accion = btn.dataset.accion;

        if (!id) return console.error("No hay datos en el botón.");

        if (accion === "detalles") {
            mostrarPopup({
                encabezado: `Información del pedido ${id}`,
                //Luego se hace el calculo de las ganancias, supongo
                mensaje: `
                    <br>
                    <div class="card-title">Información General</div>
                    <div class="g2">
                        <div class="fg">
                            <label>Nombre del Cliente</label>
                            <p>${detalle.cliente}</p>
                        </div>
                        <div class="fg">
                            <label>Venta Realizada</label>
                            <p>${detalle.fecha}</p>
                        </div>
                    </div>
                    <div class="g2">
                        
                        <!-- div class="fg">
                            <label>Ganancias Obtenidas</label>
                            <p>$${detalle.total}</p>
                        </div -->
                    </div>

                    <div class="card-title">Productos</div>
                    <div class="fg">
                        ${detalle.productos.map(p => `
                            <p>------------------------------------</p>
                            <div class="fg">
                                <br>
                                <label>Nombre del Producto</label>
                                <p>${p.nombre}</p>
                                <br>
                                <div class="g2">
                                    <div class="fg">
                                        <label>Precio Unitario</label>
                                        <p>$${p.precio}</p>
                                    </div>
                                    <div class="fg">
                                        <label>Unidades</label>
                                        <p>${p.cantidad} unidades</p>
                                    </div>
                                </div>
                                <br>
                                <label>Total del producto</label>
                                <p>$${p.totalProducto}</p>
                            </div>
                            
                            `).join("")}
                            <p>------------------------------------</p>
                    </div>
                    <div class="card-title">Montos</div>
                    <div class="g2">
                        <div class="fg">
                            <label>Subtotal</label>
                            <p>$${detalle.subtotal}</p>
                        </div>
                        <div class="fg">
                            <label>IVA</label>
                            <p>$${detalle.iva}</p>
                        </div>
                        <div class="fg">
                            <label>Total</label>
                            <p>$${detalle.total}</p>
                        </div>
                        <div class="fg">
                            <label>Cantidad Pagada</label>
                            <p>$${detalle.total + detalle.cambio}</p>
                        </div>
                        <div class="fg">
                            <label>Cambio</label>
                            <p>$${detalle.cambio}</p>
                        </div>
                    </div>
                `,
                botones: [
                    { texto: "Cerrar", estilo: "btn-s" },
                    //{ texto: "Eliminar", estilo: "btn-d", accion: async () => await deleteDoc(doc(db, "ventas", id)) }
                ]
            });
        };
    });

};





mostrarVentas();

async function mostrarResultados() {
    const gananciasTotales = document.getElementById("gananciaTotal");

    const ventas = await getDoc(doc(db, "ventas", "ganancias")); 
    const datosVentas = ventas.data();
    gananciasTotales.innerText = `$${Number(datosVentas.ventaTotal)}`;
    console.log(venta.ventaTotal);
};

//mostrarResultados();