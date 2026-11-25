import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../../src/infrastructure/catalogo-datos.js';
import { cartSummary, changeQuantity, filterProducts, restoreRemovedLine } from '../../src/domain/reglas.js';
import { crearDetallePedido, crearPedido, crearProducto, ErrorDominio } from '../../src/domain/entidades.js';

test('filtra productos de la categoría seleccionada', () => {
  const coffee = filterProducts(products, 'Café', '');
  assert.ok(coffee.length > 0);
  assert.ok(coffee.every((product) => product.category === 'Café'));
});

test('busca sin distinguir mayúsculas ni tildes', () => {
  assert.ok(filterProducts(products, 'Todo', 'SANDUCHE').some((product) => product.id === 'sandwich'));
  assert.ok(filterProducts(products, 'Todo', 'capuchíno').some((product) => product.id === 'cappuccino'));
});

test('calcula unidades, subtotal y total para cantidades válidas', () => {
  const summary = cartSummary({ latte: 2 }, products);
  assert.equal(summary.count, 2);
  assert.equal(summary.total, 5.5);
  assert.equal(summary.lines[0].subtotal, 5.5);
});

test('ignora cantidades inválidas y productos desconocidos', () => {
  assert.deepEqual(cartSummary({ latte: -1, espresso: 1.5, missing: 4 }, products), { lines: [], count: 0, total: 0 });
});

test('reducir a cero retira la línea', () => {
  assert.deepEqual(changeQuantity({ latte: 1 }, 'latte', -1), {});
  assert.deepEqual(changeQuantity({ latte: 1 }, 'latte', 1), { latte: 2 });
});

test('recupera cantidades de una línea quitada del carrito', () => {
  assert.deepEqual(restoreRemovedLine({ espresso: 1 }, 'latte', 2), { espresso: 1, latte: 2 });
  assert.deepEqual(restoreRemovedLine({ latte: 1 }, 'latte', 2), { latte: 3 });
});

test('entidades rechazan precio, cantidad o pedido inválidos', () => {
  assert.throws(() => crearProducto({ id: 'x', name: 'X', price: 0, category: 'Café' }), ErrorDominio);
  const latte = crearProducto(products[1]);
  assert.throws(() => crearDetallePedido(latte, 0), ErrorDominio);
  assert.throws(() => crearPedido('CU-1', []), ErrorDominio);
});

test('la entidad Producto conserva la ruta local de su imagen', () => {
  assert.equal(crearProducto(products[0]).image, './assets/menu/espresso.jpg');
});
