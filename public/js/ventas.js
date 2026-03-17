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
                        <button class="btn btn-s" style="padding:4px 9px;font-size:12px" data-id="${documento.id}">Ver Detalles</button>
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

    document.getElementById();

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