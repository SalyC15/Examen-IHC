import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../src/products.js';
import { cartSummary, filterProducts } from '../src/domain.js';

test('filtra productos de la categoría seleccionada', () => {
  const coffee = filterProducts(products, 'Café', '');
  assert.ok(coffee.length > 0);
  assert.ok(coffee.every((product) => product.category === 'Café'));
});

test('busca sin distinguir mayúsculas ni tildes', () => {
  assert.ok(filterProducts(products, 'Todo', 'SANDUCHE').some((product) => product.id === 'sandwich'));
});

test('calcula unidades y total para cantidades válidas', () => {
  assert.deepEqual(cartSummary({ latte: 2 }, products), {
    lines: [{ product: products.find((product) => product.id === 'latte'), quantity: 2 }],
    count: 2,
    total: 5.5,
  });
});

test('ignora cantidades inválidas y productos desconocidos', () => {
  assert.deepEqual(cartSummary({ latte: -1, espresso: 1.5, missing: 4 }, products), {
    lines: [], count: 0, total: 0,
  });
});
