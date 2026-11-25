// Punto de composición: conecta infraestructura → aplicación → presentación.
import { crearPedidoServicio } from './application/pedido-servicio.js';
import { crearCatalogoRepositorio } from './infrastructure/catalogo-repositorio.js';
import { crearAlmacenMemoria, crearPedidoRepositorioLocal } from './infrastructure/pedido-repositorio-local.js';
import { iniciarApp } from './presentation/app.js';

function almacenDisponible() {
  try { return window.localStorage; } catch { return crearAlmacenMemoria(); }
}

const servicio = crearPedidoServicio({
  catalogo: crearCatalogoRepositorio(),
  repositorio: crearPedidoRepositorioLocal(almacenDisponible()),
});

iniciarApp(servicio);
