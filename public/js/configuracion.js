// configuracion.js
document.querySelectorAll('.cfg-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cfg-tab').forEach(t => t.classList.remove('activo'));
    tab.classList.add('activo');
  });
});

document.querySelectorAll('.toggle').forEach(t => {
  t.addEventListener('click', () => t.classList.toggle('on'));
});

document.getElementById('btn-guardar')?.addEventListener('click', () => {
  // TODO: integrar con Firebase
  alert('Configuración guardada.');
});
