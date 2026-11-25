// Capa de presentación: eventos del DOM, renderizado, foco y mensajes. Delega toda regla al servicio de aplicación.
import { BotonCategoria, LineaPedido, ResultadosVacios, TarjetaProducto, atraparFoco, formatearPrecio } from './componentes.js';

export function iniciarApp(servicio) {
  const $ = (selector) => document.querySelector(selector);
  const ui = {
    grid: $('#product-grid'), categories: $('#categories'), search: $('#search'), results: $('#results-label'),
    count: $('#cart-count'), cartButton: $('.cart-trigger'), panel: $('#cart-panel'), backdrop: $('#cart-backdrop'),
    items: $('#cart-items'), empty: $('#cart-empty'), summary: $('#cart-summary'), total: $('#cart-total'),
    toast: $('#toast'), undo: $('#cart-undo'), confirmation: $('#confirmation'), confirmationBackdrop: $('#confirmation-backdrop'),
  };
  let category = 'Todo';
  let toastTimer;
  let previousFocus;
  let confirmationFocus;

  function renderCategories() {
    ui.categories.innerHTML = servicio.categorias().map((item) => BotonCategoria(item, item === category)).join('');
  }

  function renderProducts() {
    const visible = servicio.buscarProductos(category, ui.search.value);
    ui.results.textContent = `${visible.length} ${visible.length === 1 ? 'opción' : 'opciones'}`;
    ui.grid.innerHTML = visible.length ? visible.map(TarjetaProducto).join('') : ResultadosVacios();
  }

  function renderCart() {
    const { lines, count, total } = servicio.resumen();
    ui.count.textContent = count;
    ui.cartButton.setAttribute('aria-label', `Ver pedido, ${count} ${count === 1 ? 'producto' : 'productos'}`);
    ui.items.innerHTML = lines.map(LineaPedido).join('');
    ui.empty.hidden = count > 0;
    ui.summary.hidden = count === 0;
    ui.total.textContent = formatearPrecio(total);
  }

  function notify(message, duracion = 2600) {
    ui.toast.textContent = message;
    ui.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => ui.toast.classList.remove('is-visible'), duracion);
  }

  function setModal(element, open) {
    element.inert = !open;
    element.setAttribute('aria-hidden', String(!open));
    element.classList.toggle('is-open', open);
  }

  function openCart() {
    previousFocus = document.activeElement;
    setModal(ui.panel, true); ui.backdrop.hidden = false;
    $('#close-cart').focus();
  }
  function closeCart() {
    clearUndo();
    setModal(ui.panel, false); ui.backdrop.hidden = true;
    previousFocus?.focus();
  }

  function openConfirmation(order) {
    confirmationFocus = document.activeElement;
    $('#confirmation-details').textContent = `Pedido ${order.id} · ${order.count} ${order.count === 1 ? 'producto' : 'productos'} · ${formatearPrecio(order.total)}. Puedes recogerlo en cafetería.`;
    setModal(ui.confirmation, true); ui.confirmationBackdrop.hidden = false;
    $('#done').focus();
  }
  function closeConfirmation() {
    setModal(ui.confirmation, false); ui.confirmationBackdrop.hidden = true;
    confirmationFocus?.focus();
  }

  function checkout() {
    const pedido = servicio.confirmarPedido();
    if (!pedido) return;
    renderCart(); closeCart(); openConfirmation(pedido);
  }

  function undoOrder() {
    if (!servicio.deshacerPedido()) return;
    renderCart(); closeConfirmation();
    notify('Pedido recuperado. Puedes continuar editándolo.'); openCart();
  }

  ui.categories.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (button) { category = button.dataset.category; renderCategories(); renderProducts(); }
  });
  ui.search.addEventListener('input', renderProducts);
  ui.grid.addEventListener('click', (event) => {
    const add = event.target.closest('[data-add]');
    if (add) {
      const producto = servicio.agregarProducto(add.dataset.add);
      if (producto) { renderCart(); notify(`${producto.name} añadido al pedido`); }
    }
    if (event.target.closest('[data-clear-search]')) { ui.search.value = ''; ui.search.focus(); renderProducts(); }
  });
  ui.cartButton.addEventListener('click', openCart);
  $('#close-cart').addEventListener('click', closeCart);
  $('#browse-menu').addEventListener('click', () => { closeCart(); $('#menu').scrollIntoView(); });
  ui.backdrop.addEventListener('click', closeCart);
  ui.items.addEventListener('click', (event) => {
    const quantityButton = event.target.closest('[data-quantity]');
    const removeButton = event.target.closest('[data-remove]');
    if (quantityButton) {
      const id = quantityButton.dataset.quantity;
      servicio.cambiarCantidad(id, Number(quantityButton.dataset.delta));
      renderCart();
      // Mantener el foco en el mismo control tras volver a renderizar (teclado).
      const same = ui.items.querySelector(`[data-quantity="${id}"][data-delta="${quantityButton.dataset.delta}"]`);
      (same || $('#close-cart')).focus();
    }
    if (removeButton) {
      const eliminada = servicio.eliminarLinea(removeButton.dataset.remove);
      renderCart();
      if (eliminada) showUndo(eliminada); else $('#close-cart').focus();
    }
  });

  // V2: la recuperación vive dentro del panel modal, así es alcanzable con teclado y no expira.
  function showUndo(eliminada) {
    const name = eliminada.product.name;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'undo-inline';
    button.textContent = 'Deshacer';
    button.setAttribute('aria-label', `Deshacer: recuperar ${name}`);
    button.addEventListener('click', () => {
      servicio.recuperarLinea(eliminada);
      renderCart();
      ui.undo.replaceChildren(document.createTextNode(`${name} recuperado en el pedido.`));
      $('#close-cart').focus();
    }, { once: true });
    ui.undo.replaceChildren(document.createTextNode(`${name} eliminado del pedido. `), button);
    ui.undo.hidden = false;
    button.focus();
  }
  function clearUndo() { ui.undo.replaceChildren(); ui.undo.hidden = true; }
  $('#checkout').addEventListener('click', checkout);
  $('#close-confirmation').addEventListener('click', closeConfirmation);
  $('#done').addEventListener('click', closeConfirmation);
  $('#undo-order').addEventListener('click', undoOrder);
  ui.confirmationBackdrop.addEventListener('click', closeConfirmation);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (ui.confirmation.classList.contains('is-open')) closeConfirmation();
      else if (ui.panel.classList.contains('is-open')) closeCart();
    }
    if (event.key === 'Tab' && ui.confirmation.classList.contains('is-open')) atraparFoco(event, ui.confirmation);
    else if (event.key === 'Tab' && ui.panel.classList.contains('is-open')) atraparFoco(event, ui.panel);
  });

  renderCategories(); renderProducts(); renderCart();
  if (servicio.estadoInicialCorrupto) {
    notify('No pudimos recuperar tu pedido anterior; empezamos uno nuevo.', 6000);
  }
}
