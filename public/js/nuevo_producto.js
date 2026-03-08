import { auth, db } from "./firebase.js";
//import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, addDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const nombreProducto = document.getElementById("nombre_producto").value;
const descripcionProducto = document.getElementById("descripcion_producto").value;
const categoriaProducto = document.getElementById("categoria_producto").value;
const marcaProducto = document.getElementById("marca_producto").value;
const imagenProducto = document.getElementById("imagen_producto"); //Imagen
// Por el momento lo dejaré con estos valores
const costo  = document.getElementById('costo').value;
const venta  = document.getElementById('venta').value;
//const margen = document.getElementById('margen').value;
const cantidadInicial = document.getElementById("cantidadInicial").value;
//const stockminimo = document.getElementById("stockMinimo").value;
//const stockmaximo = document.getElementById("stockMaximo").value;

// function calcMargen() {
//   const c = parseFloat(costo.value), v = parseFloat(venta.value);
//   margen.value = (c > 0 && v > 0) ? ((v - c) / v * 100).toFixed(1) + '%' : '';
// }

// costo.addEventListener('input', calcMargen);
// venta.addEventListener('input', calcMargen);



document.getElementById('btn-cancelar').addEventListener('click', () => {
  window.location.href = 'panel_inventario.html';
});

document.getElementById('btn-guardar').addEventListener('click', async () => {

  //Función para obtener la imagen en Base64
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
  descripcion: descripcionProducto,
  categoria: categoriaProducto,
  marca: marcaProducto,
  img: base64String,
  compra: costo,
  precioCliente: venta,
  cantidad: cantidadInicial
  };

  await addDoc(collection(db, "productos"), producto);
  alert("Producto agregado");
  window.location.href = 'panel_inventario.html';

  }
  
  
});




