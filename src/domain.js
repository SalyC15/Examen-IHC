export function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

export function filterProducts(products, category, query) {
  const normalizedQuery = normalize(query.trim());
  return products.filter((product) => (category === 'Todo' || product.category === category)
    && normalize(`${product.name} ${product.description} ${product.category} ${product.tag}`).includes(normalizedQuery));
}

export function cartSummary(cart, products) {
  const lines = Object.entries(cart)
    .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
    .filter((line) => line.product && Number.isInteger(line.quantity) && line.quantity > 0);
  return {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
  };
}

export function restoreRemovedLine(cart, id, quantity) {
  return { ...cart, [id]: (cart[id] || 0) + quantity };
}
