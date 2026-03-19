import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


document.getElementById('btn-guardar').addEventListener('click', async () => {
  const nombreProducto = document.getElementById("nombre_producto").value.trim();
  const descripcionProducto = document.getElementById("descripcion_producto").value.trim();
  const descNueva = (descripcionProducto === "") ? "N/A" : descripcionProducto;
  const categoriaProducto = document.getElementById("categoria_producto").value;
  const marcaProducto = document.getElementById("marca_producto").value;
  const imagenProducto = document.getElementById("imagen_producto"); //Imagen
  const costo = Number(document.getElementById('costo').value);
  const costoNuevo = (costo <= 0) ? 0 : costo;
  const venta = Number(document.getElementById('venta').value);
  const ventaNueva = (venta <= 0) ? 0 : venta;
  const cantidadInicial = Number(document.getElementById("cantidadInicial").value);
  const cantNueva = (cantidadInicial <= 0) ? 0 : cantidadInicial;

  const archivoImagen = imagenProducto.files[0];

  if (!archivoImagen) {
    alert("Por favor selecciona una imagen.");
    return;
  } else {
    const base64String = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(archivoImagen);
    });

  const producto = {
    nombre: nombreProducto,
    descripcion: descNueva,
    categoria: categoriaProducto,
    marca: marcaProducto,
    img: base64String,
    compra: costoNuevo,
    precioCliente: ventaNueva,
    cantidad: cantNueva
  };

  await addDoc(collection(db, "productos"), producto);
  alert("Producto agregado");
  window.location.href = 'panel_inventario.html';

  }
});

document.getElementById('btn-cancelar').addEventListener('click', () => {
  window.location.href = 'panel_inventario.html';
});


