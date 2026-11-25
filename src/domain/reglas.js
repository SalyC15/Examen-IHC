// Capa de dominio: reglas puras sobre catálogo y carrito.
import { crearDetallePedido, esCantidadValida, redondear } from './entidades.js';

/** Normaliza texto para buscar sin distinguir tildes ni mayúsculas. */
export function normalize(text) {
  return String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase('es');
}

export function filterProducts(products, category, query) {
  const normalizedQuery = normalize(query.trim());
  return products.filter((product) => (category === 'Todo' || product.category === category)
    && normalize(`${product.name} ${product.description} ${product.category} ${product.tag}`).includes(normalizedQuery));
}

/** Convierte el carrito {id: cantidad} en detalles válidos con unidades y total. */
export function cartSummary(cart, products) {
  const lines = Object.entries(cart)
    .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
    .filter((line) => line.product && esCantidadValida(line.quantity))
    .map((line) => crearDetallePedido(line.product, line.quantity));
  return {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: redondear(lines.reduce((sum, line) => sum + line.subtotal, 0)),
  };
}

/** Suma o resta unidades; una cantidad menor o igual a cero retira la línea. */
export function changeQuantity(cart, id, delta) {
  const next = (cart[id] || 0) + delta;
  const { [id]: _removed, ...rest } = cart;
  return next > 0 ? { ...cart, [id]: next } : rest;
}

export function removeLine(cart, id) {
  const { [id]: _removed, ...rest } = cart;
  return rest;
}

export function restoreRemovedLine(cart, id, quantity) {
  return { ...cart, [id]: (cart[id] || 0) + quantity };
}
