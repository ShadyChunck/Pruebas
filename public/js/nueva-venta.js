// nueva-venta.js
const IVA = 0.16;
let carrito = [];

const itemsEl    = document.getElementById('cart-items');
const lblSub     = document.getElementById('lbl-sub');
const lblIva     = document.getElementById('lbl-iva');
const lblTotal   = document.getElementById('lbl-total');
const btnCobrar  = document.getElementById('btn-cobrar');

function render() {
  if (!carrito.length) {
    itemsEl.innerHTML = '<p style="text-align:center;color:#ccc;font-size:12px;margin-top:10px;">· Agrega productos desde el catálogo ·</p>';
    actualizar(0); return;
  }
  itemsEl.innerHTML = carrito.map(p => `
    <div class="cart-item">
      <span class="cart-item-name">${p.emo} ${p.nombre}</span>
      <div class="cart-qty">
        <button class="q-btn" onclick="cambiar('${p.id}',-1)">−</button>
        <span>${p.qty}</span>
        <button class="q-btn" onclick="cambiar('${p.id}',1)">+</button>
      </div>
      <span class="cart-price">$${(p.precio * p.qty).toFixed(2)}</span>
    </div>`).join('');
  actualizar(carrito.reduce((s, p) => s + p.precio * p.qty, 0));
}

function actualizar(sub) {
  const iva = sub * IVA, total = sub + iva;
  lblSub.textContent   = `$${sub.toFixed(2)}`;
  lblIva.textContent   = `$${iva.toFixed(2)}`;
  lblTotal.textContent = `$${total.toFixed(2)}`;
  btnCobrar.textContent = `✅ Cobrar $${total.toFixed(2)}`;
}

window.agregar = (id, nombre, emo, precio) => {
  const p = carrito.find(x => x.id === id);
  p ? p.qty++ : carrito.push({ id, nombre, emo, precio, qty: 1 });
  render();
};

window.cambiar = (id, d) => {
  const p = carrito.find(x => x.id === id);
  if (!p) return;
  p.qty += d;
  if (p.qty <= 0) carrito = carrito.filter(x => x.id !== id);
  render();
};

document.getElementById('btn-limpiar').addEventListener('click', () => { carrito = []; render(); });

btnCobrar.addEventListener('click', () => {
  if (!carrito.length) { alert('El carrito está vacío.'); return; }
  // TODO: integrar con Firebase
  alert('Venta registrada.');
  carrito = []; render();
});

render();
