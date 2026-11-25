// Capa de presentación: componentes reutilizables (plantillas HTML semánticas y accesibles).
const money = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' });
export const formatearPrecio = (precio) => money.format(precio);

const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function BotonCategoria(nombre, activa) {
  return `<button class="category-button" type="button" aria-pressed="${activa}" data-category="${escapar(nombre)}">${escapar(nombre)}</button>`;
}

export function TarjetaProducto(producto) {
  const nombre = escapar(producto.name);
  return `
    <article class="product-card">
      <div class="product-image tone-${producto.tone}">
        <img src="${escapar(producto.image)}" alt="${nombre}" loading="lazy" decoding="async">
        ${producto.tag ? `<span class="product-tag">${escapar(producto.tag)}</span>` : ''}
      </div>
      <div class="product-info"><div class="product-title-row"><h3>${nombre}</h3><span class="price">${formatearPrecio(producto.price)}</span></div>
        <p class="product-description">${escapar(producto.description)}</p>
        <button class="add-button" type="button" data-add="${producto.id}" aria-label="Añadir ${nombre} al pedido"><span aria-hidden="true">＋</span> Añadir al pedido</button></div>
    </article>`;
}

export function ResultadosVacios() {
  return '<div class="empty-results"><p>No encontramos opciones con esa búsqueda.</p><button class="text-link" type="button" data-clear-search>Limpiar búsqueda</button></div>';
}

export function LineaPedido({ product, quantity, subtotal }) {
  const nombre = escapar(product.name);
  return `
    <article class="cart-line"><img class="cart-thumb" src="${escapar(product.image)}" alt="" loading="lazy" decoding="async"><div>
      <p class="cart-line-name">${nombre}</p><span class="cart-line-price">${formatearPrecio(product.price)} c/u</span>
      <div class="quantity-controls" role="group" aria-label="Cantidad de ${nombre}">
        <button type="button" data-quantity="${product.id}" data-delta="-1" aria-label="Reducir ${nombre}">−</button>
        <span aria-live="polite">${quantity}</span>
        <button type="button" data-quantity="${product.id}" data-delta="1" aria-label="Aumentar ${nombre}">+</button>
      </div>
      <button class="remove-button" type="button" data-remove="${product.id}" aria-label="Quitar ${nombre} del pedido">Quitar</button></div>
      <span class="line-total">${formatearPrecio(subtotal)}</span></article>`;
}

/** Mantiene el foco dentro de un diálogo modal abierto (Tab / Shift+Tab). */
export function atraparFoco(evento, contenedor) {
  const focusable = [...contenedor.querySelectorAll('button:not(:disabled)')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (evento.shiftKey && document.activeElement === first) { evento.preventDefault(); last.focus(); }
  else if (!evento.shiftKey && document.activeElement === last) { evento.preventDefault(); first.focus(); }
}
