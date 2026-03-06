// sidebar.js - Resalta el item activo según la página actual
const PAGE_NAV = {
  'index.html'      : 'nav-dashboard',
  'panel_inventario.html'     : 'nav-inventario',
  'panel_nuevo_producto.html' : 'nav-nuevo-producto',
  'panel_ventas.html'         : 'nav-ventas',
  'panel_nueva-venta.html'    : 'nav-nueva-venta',
  'panel_reportes.html'       : 'nav-reportes',
  'panel_configuracion.html'  : 'nav-configuracion',
};

const page = window.location.pathname.split('/').pop();
document.getElementById(PAGE_NAV[page])?.classList.add('activo');

