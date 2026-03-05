// nuevo-producto.js
const costo  = document.getElementById('costo');
const venta  = document.getElementById('venta');
const margen = document.getElementById('margen');

function calcMargen() {
  const c = parseFloat(costo.value), v = parseFloat(venta.value);
  margen.value = (c > 0 && v > 0) ? ((v - c) / v * 100).toFixed(1) + '%' : '';
}

costo.addEventListener('input', calcMargen);
venta.addEventListener('input', calcMargen);

document.getElementById('btn-cancelar').addEventListener('click', () => {
  window.location.href = 'panel_inventario.html';
});

document.getElementById('btn-guardar').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  const sku    = document.getElementById('sku').value.trim();
  if (!nombre || !sku) { alert('Completa los campos obligatorios (Nombre y SKU).'); return; }
  // TODO: integrar con Firebase
  alert(`Producto "${nombre}" guardado.`);
  window.location.href = 'panel_inventario.html';
});


