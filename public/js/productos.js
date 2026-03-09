import { auth, db } from "./firebase.js"
import { doc, getDoc, addDoc, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function mostrarProductos() {
    const tablaProductos = document.getElementById("tabla_productos");
    
    //Creación de mas td

    //Aqui se cuentan todos los productos
    onSnapshot(collection(db, "productos"), (documentos) => {
        try {
            //Por cada documento que se obtiene
            documentos.forEach((documento) => {
                const producto = documento.data();

                const trFila = document.createElement("tr");
                const tdID = document.createElement("td");
                tdID.textContent = documento.id;

                const tdProducto = document.createElement("td");
                tdProducto.textContent = producto.nombre;

                const tdDescripcion = document.createElement("td");
                tdDescripcion.textContent = producto.descripcion;

                const tdMarca = document.createElement("td");
                tdMarca.textContent = producto.marca;

                const tdCategoria = document.createElement("td");
                tdCategoria.textContent = producto.categoria;

                const tdPrecio = document.createElement("td");
                tdPrecio.innerHTML = `
                    <strong>$${Number(producto.precioCliente)}</strong>
                `;

                const tdStock = document.createElement("td");
                tdStock.textContent = Number(producto.cantidad);

                const tdEstado = document.createElement("td");
                //Verificar que si se inserten bien
                if (Number(producto.cantidad) >= 1)
                {
                    tdEstado.innerHTML = `
                    <span class="badge b-green">Disponible</span>
                    `;
                } else {
                    tdEstado.innerHTML = `
                    <span class="badge b-red">No disponible</span>
                    `;
                }

                const tdBotones = document.createElement("td");
                tdBotones.innerHTML = `
                    <button class="btn btn-s" style="padding:4px 9px;font-size:12px">Editar</button>
                    <button class="btn btn-d" style="padding:4px 9px;font-size:12px">Eliminar</button>
                `;
                tdBotones.style = "display:flex;gap:5px";

                trFila.appendChild(tdID);
                trFila.appendChild(tdProducto);
                trFila.appendChild(tdDescripcion);
                trFila.appendChild(tdMarca);
                trFila.appendChild(tdCategoria);
                trFila.appendChild(tdPrecio);
                trFila.appendChild(tdStock);
                trFila.appendChild(tdEstado);
                trFila.appendChild(tdBotones);
                
                tablaProductos.appendChild(trFila);
                //tdProducto.textContent = () ? "Disponible" : "No Disponible";
                console.log(`Fila Insertada: ${documento.id}`);


            });
        } catch (e) {

        };
    });
};

mostrarProductos();