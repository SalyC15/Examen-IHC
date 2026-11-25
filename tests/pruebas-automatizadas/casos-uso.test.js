// Pruebas funcionales críticas: reproducen las tareas T1, T2 y T3 del plan de evaluación sobre la capa de aplicación.
import test from 'node:test';
import assert from 'node:assert/strict';
import { crearPedidoServicio } from '../../src/application/pedido-servicio.js';
import { crearCatalogoRepositorio } from '../../src/infrastructure/catalogo-repositorio.js';
import { crearAlmacenMemoria, crearPedidoRepositorioLocal, STORAGE_KEY } from '../../src/infrastructure/pedido-repositorio-local.js';

function nuevoServicio(almacen = crearAlmacenMemoria()) {
  return crearPedidoServicio({
    catalogo: crearCatalogoRepositorio(),
    repositorio: crearPedidoRepositorioLocal(almacen),
    generarId: () => 'CU-000001',
  });
}

test('T1: buscar "LATTE" sin tilde ni minúsculas y agregarlo al pedido', () => {
  const servicio = nuevoServicio();
  const encontrados = servicio.buscarProductos('Todo', 'LATTE DE LA CASA');
  assert.equal(encontrados.length, 1);
  servicio.agregarProducto(encontrados[0].id);
  const { count, lines } = servicio.resumen();
  assert.equal(count, 1);
  assert.equal(lines[0].product.id, 'latte');
});

test('T2: modificar cantidad a dos y verificar total', () => {
  const servicio = nuevoServicio();
  servicio.agregarProducto('latte');
  servicio.cambiarCantidad('latte', 1);
  assert.deepEqual([servicio.resumen().count, servicio.resumen().total], [2, 5.5]);
  servicio.cambiarCantidad('latte', -1);
  assert.equal(servicio.resumen().total, 2.75);
});

test('T3: eliminar latte, recuperarlo y confirmar pedido con total correcto', () => {
  const servicio = nuevoServicio();
  servicio.agregarProducto('latte');
  servicio.agregarProducto('espresso');
  const eliminada = servicio.eliminarLinea('latte');
  assert.equal(servicio.resumen().count, 1);
  servicio.recuperarLinea(eliminada);
  const pedido = servicio.confirmarPedido();
  assert.equal(pedido.id, 'CU-000001');
  assert.equal(pedido.count, 2);
  assert.equal(pedido.total, 4.5);
  assert.equal(servicio.resumen().count, 0, 'el carrito queda vacío tras confirmar');
});

test('no se confirma un pedido vacío', () => {
  assert.equal(nuevoServicio().confirmarPedido(), null);
});

test('cancelar el pedido vacía el carrito y permite restaurar sus cantidades', () => {
  const servicio = nuevoServicio();
  servicio.agregarProducto('chai');
  servicio.agregarProducto('latte');
  servicio.cambiarCantidad('latte', 1);
  const cancelado = servicio.cancelarPedido();
  assert.equal(servicio.resumen().count, 0);
  servicio.recuperarPedidoCancelado(cancelado);
  assert.equal(servicio.cantidadDe('chai'), 1);
  assert.equal(servicio.cantidadDe('latte'), 2);
  assert.equal(servicio.resumen().total, 8.4);
});

test('no se puede cancelar un carrito vacío', () => {
  assert.equal(nuevoServicio().cancelarPedido(), null);
});

test('deshacer pedido devuelve los productos al carrito', () => {
  const servicio = nuevoServicio();
  servicio.agregarProducto('chai');
  servicio.confirmarPedido();
  assert.equal(servicio.deshacerPedido(), true);
  assert.equal(servicio.cantidadDe('chai'), 1);
});

test('persistencia: el carrito sobrevive a una recarga (LocalStorage)', () => {
  const almacen = crearAlmacenMemoria();
  nuevoServicio(almacen).agregarProducto('matcha');
  assert.equal(nuevoServicio(almacen).cantidadDe('matcha'), 1);
});

test('persistencia: un estado corrupto se descarta y se informa', () => {
  const servicio = nuevoServicio(crearAlmacenMemoria({ [STORAGE_KEY]: '{no es json' }));
  assert.equal(servicio.estadoInicialCorrupto, true);
  assert.equal(servicio.resumen().count, 0);
});
