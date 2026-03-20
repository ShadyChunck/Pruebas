import { auth, db } from "./firebase.js"
import { mostrarPopup } from "./popup.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
import { doc, getDoc, deleteDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function productosTotales() {
    const totalProductos = document.getElementById("conteoProductos");

    onSnapshot(collection(db, "productos"), (documentos) => {
        totalProductos.innerText = `${documentos.size} productos en total`;
    });
};

function mostrarProductos() {
    const tablaProductos = document.getElementById("tabla_productos");

    //Aqui se cuentan todos los productos
    onSnapshot(collection(db, "productos"), (documentos) => {
        tablaProductos.innerHTML = "";
        try {
            //Por cada documento que se obtiene
            documentos.forEach((documento) => {
                const producto = documento.data();

                const trFila = document.createElement("tr");

                const tdImagen = document.createElement("td");
                tdImagen.innerHTML = `
                    <img src="${producto.img}" style="width: 3rem; height: auto;"></img>
                `;

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
                tdBotones.style = "display: flex; gap:5px; align-items: center; justify-content: center;";

                onAuthStateChanged(auth, async (usuario) => {
                    const usuarioActual = doc(db, "usuarios", usuario.uid);
                    const usuarioDocumento = await getDoc(usuarioActual);
                    const datos = usuarioDocumento.data();

                    if (datos.tipo === "Administrador")
                    {
                        tdBotones.innerHTML = `
                            <button class="btn btn-s" style="padding:4px 9px;font-size:12px" id="btn_editar" data-id="${documento.id}" data-accion="editar">Editar</button>
                            <button class="btn btn-d" style="padding:4px 9px;font-size:12px" id="btn_eliminar" data-id="${documento.id}" data-nombre="${producto.nombre}" data-accion="eliminar">Eliminar</button>
                        `;
                    } else {
                            tdBotones.innerHTML = `
                                <button class="btn btn-s" style="padding:4px 9px;font-size:12px" id="btn_editar" data-id="${documento.id}" data-accion="editar">Editar</button>
                            `;
                    }
                });
                
                trFila.appendChild(tdImagen);
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
                console.log(`Fila Insertada: ${documento.id}`);
            });
        } catch (e) {
            console.log(e);
        };
    });

    //Para eliminar productos
    tablaProductos.addEventListener("click", async (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        //Obtener id y accion del producto
        const id = btn.dataset.id;
        const accion = btn.dataset.accion;

        if (!id) return console.error("No hay datos en el botón.");

        if (accion === "eliminar") {
            mostrarPopup({
                encabezado: `Eliminar ${btn.dataset.nombre}`,
                mensaje: `
                    <br>
                    <p>¿Desea eliminar "${btn.dataset.nombre}" de la base de datos?</p>
                `,
                botones: [
                    { texto: "Cancelar", estilo: "btn-s" },
                    { texto: "Eliminar", estilo: "btn-d", accion: async () => await deleteDoc(doc(db, "productos", id)) }
                ]
            });
        };

        if (accion === "editar") {
            window.location.href = `panel_nuevo_producto.html?id=${id}`;
        }

    });
    productosTotales();
};


mostrarProductos();