// SOLAMENTE PRUEBAS

import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let idProductoEditando = null;

// 🔍 detectar edición
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
    idProductoEditando = id;
    cargarProducto(id);

    document.querySelector("h2").textContent = "Editar Producto";
    document.getElementById("btn-guardar").textContent = "Actualizar Producto";
    document.querySelector("main").classList.add("modo-edicion");
}

//cargar producto
async function cargarProducto(id) {
    console.log("Cargando producto con ID:", id);

    const ref = doc(db, "productos", id);
    const snap = await getDoc(ref);

    console.log("¿Existe documento?:", snap.exists());

    if (snap.exists()) {
        const data = snap.data();
        console.log("Datos del producto:", data);

        document.getElementById("nombre_producto").value = data.nombre || "";
        document.getElementById("descripcion_producto").value = data.descripcion || "";
        document.getElementById("categoria_producto").value = data.categoria || "";
        document.getElementById("marca_producto").value = data.marca || "";
        document.getElementById("costo").value = data.compra || 0;
        document.getElementById("venta").value = data.precioCliente || 0;
        document.getElementById("cantidadInicial").value = data.cantidad || 0;

        //  preview imagen existente
        const preview = document.getElementById("preview_imagen");
        if (data.img && preview) {
            preview.src = data.img;
            preview.style.display = "block";
        }
    }
}

//  preview imagen nueva (PROTEGIDO)
const inputImagen = document.getElementById("imagen_producto");
const preview = document.getElementById("preview_imagen");

if (inputImagen && preview) {
    inputImagen.addEventListener("change", () => {
        const archivo = inputImagen.files[0];

        if (archivo) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(archivo);
        }
    });
}

//  guardar / editar
document.getElementById('btn-guardar').addEventListener('click', async () => {
    console.log("CLICK GUARDAR");

    const nombreProducto = document.getElementById("nombre_producto").value.trim();
    const descripcionProducto = document.getElementById("descripcion_producto").value.trim();
    const categoriaProducto = document.getElementById("categoria_producto").value;
    const marcaProducto = document.getElementById("marca_producto").value;

    const costo = Number(document.getElementById('costo').value) || 0;
    const venta = Number(document.getElementById('venta').value) || 0;
    const cantidad = Number(document.getElementById("cantidadInicial").value) || 0;

    const archivoImagen = inputImagen.files[0];
    let base64String = null;

    if (archivoImagen) {
        base64String = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(archivoImagen);
        });
    }

    const producto = {
        nombre: nombreProducto,
        descripcion: descripcionProducto || "N/A",
        categoria: categoriaProducto,
        marca: marcaProducto,
        compra: costo,
        precioCliente: venta,
        cantidad: cantidad
    };

    if (base64String) {
        producto.img = base64String;
    }

    if (idProductoEditando) {
        const ref = doc(db, "productos", idProductoEditando);
        await updateDoc(ref, producto);
        alert("Producto actualizado");
    } else {
        await addDoc(collection(db, "productos"), producto);
        alert("Producto agregado");
    }

    window.location.href = 'panel_inventario.html';
});

//  cancelar
document.getElementById('btn-cancelar').addEventListener('click', () => {
    console.log("CLICK CANCELAR");
    window.location.href = 'panel_inventario.html';
});