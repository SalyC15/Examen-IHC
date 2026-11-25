import { products, categories } from './products.js';
import { filterProducts, cartSummary, restoreRemovedLine } from './domain.js';

const STORAGE_KEY = 'cafeu-v2-state';
const money = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' });
const $ = (selector) => document.querySelector(selector);
const ui = {
  grid: $('#product-grid'), categories: $('#categories'), search: $('#search'), results: $('#results-label'),
  count: $('#cart-count'), cartButton: $('.cart-trigger'), panel: $('#cart-panel'), backdrop: $('#cart-backdrop'),
  items: $('#cart-items'), empty: $('#cart-empty'), summary: $('#cart-summary'), total: $('#cart-total'),
  toast: $('#toast'), confirmation: $('#confirmation'), confirmationBackdrop: $('#confirmation-backdrop'),
};

function readState() {
  try {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { cart: state.cart && typeof state.cart === 'object' ? state.cart : {}, lastOrder: state.lastOrder || null };
  } catch { return { cart: {}, lastOrder: null }; }
}
const state = readState();
let category = 'Todo';
let toastTimer;

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function format(price) { return money.format(price); }

function renderCategories() {
  ui.categories.innerHTML = categories.map((item) => `<button class="category-button" type="button" aria-pressed="${item === category}" data-category="${item}">${item}</button>`).join('');
}

function renderProducts() {
  const visible = filterProducts(products, category, ui.search.value);
  ui.results.textContent = `${visible.length} ${visible.length === 1 ? 'opción' : 'opciones'}`;
  ui.grid.innerHTML = visible.length ? visible.map((product) => `
    <article class="product-card">
      <div class="product-image tone-${product.tone}" role="img" aria-label="${product.name}">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}<span class="food" aria-hidden="true">${product.emoji}</span>
      </div>
      <div class="product-info"><div class="product-title-row"><h3>${product.name}</h3><span class="price">${format(product.price)}</span></div>
        <p class="product-description">${product.description}</p><button class="add-button" type="button" data-add="${product.id}" aria-label="Añadir ${product.name} al pedido"><span aria-hidden="true">＋</span> Añadir al pedido</button></div>
    </article>`).join('') : '<div class="empty-results"><p>No encontramos opciones con esa búsqueda.</p><button class="text-link" type="button" data-clear-search>Limpiar búsqueda</button></div>';
}

function renderCart() {
  const { lines, count, total } = cartSummary(state.cart, products);
  ui.count.textContent = count;
  ui.cartButton.setAttribute('aria-label', `Ver pedido, ${count} ${count === 1 ? 'producto' : 'productos'}`);
  ui.items.innerHTML = lines.map(({ product, quantity }) => `
    <article class="cart-line"><div class="cart-thumb" aria-hidden="true">${product.emoji}</div><div>
      <p class="cart-line-name">${product.name}</p><span class="cart-line-price">${format(product.price)} c/u</span>
      <div class="quantity-controls" aria-label="Cantidad de ${product.name}"><button type="button" data-quantity="${product.id}" data-delta="-1" aria-label="Reducir ${product.name}">−</button><span aria-live="polite">${quantity}</span><button type="button" data-quantity="${product.id}" data-delta="1" aria-label="Aumentar ${product.name}">+</button></div>
      <button class="remove-button" type="button" data-remove="${product.id}">Quitar</button></div><span class="line-total">${format(product.price * quantity)}</span></article>`).join('');
  ui.empty.hidden = count > 0;
  ui.summary.hidden = count === 0;
  ui.total.textContent = format(total);
}

function notify(message, undo) {
  ui.toast.replaceChildren(document.createTextNode(message));
  if (undo) {
    const button = document.createElement('button');
    button.className = 'toast-action';
    button.type = 'button';
    button.textContent = 'Deshacer';
    button.setAttribute('aria-label', `${undo.label}; deshacer`);
    button.addEventListener('click', () => {
      undo.run();
      ui.toast.classList.remove('is-visible');
      clearTimeout(toastTimer);
    }, { once: true });
    ui.toast.append(' ', button);
  }
  ui.toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove('is-visible'), 2600);
}

function addProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  state.cart[id] = (state.cart[id] || 0) + 1;
  save(); renderCart(); notify(`${product.name} añadido al pedido`);
}

let previousFocus;
function openCart() {
  previousFocus = document.activeElement;
  ui.panel.inert = false; ui.panel.setAttribute('aria-hidden', 'false');
  ui.panel.classList.add('is-open'); ui.backdrop.hidden = false;
  $('#close-cart').focus();
}
function closeCart() {
  ui.panel.classList.remove('is-open'); ui.panel.setAttribute('aria-hidden', 'true');
  ui.panel.inert = true; ui.backdrop.hidden = true;
  previousFocus?.focus();
}

let confirmationFocus;
function openConfirmation(order) {
  confirmationFocus = document.activeElement;
  $('#confirmation-details').textContent = `Pedido ${order.id} · ${order.count} ${order.count === 1 ? 'producto' : 'productos'} · ${format(order.total)}. Puedes recogerlo en cafetería.`;
  ui.confirmation.inert = false; ui.confirmation.setAttribute('aria-hidden', 'false');
  ui.confirmation.classList.add('is-open'); ui.confirmationBackdrop.hidden = false;
  $('#done').focus();
}
function closeConfirmation() {
  ui.confirmation.classList.remove('is-open'); ui.confirmation.setAttribute('aria-hidden', 'true');
  ui.confirmation.inert = true; ui.confirmationBackdrop.hidden = true;
  confirmationFocus?.focus();
}

function checkout() {
  const { lines, count, total } = cartSummary(state.cart, products);
  if (!lines.length) return;
  const order = {
    id: `CU-${Date.now().toString().slice(-6)}`,
    count, total,
    cart: { ...state.cart },
  };
  state.lastOrder = order; state.cart = {}; save(); renderCart(); closeCart(); openConfirmation(order);
}

function undoOrder() {
  if (!state.lastOrder) return;
  state.cart = { ...state.lastOrder.cart }; state.lastOrder = null; save(); renderCart(); closeConfirmation();
  notify('Pedido recuperado. Puedes continuar editándolo.'); openCart();
}

ui.categories.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (button) { category = button.dataset.category; renderCategories(); renderProducts(); }
});
ui.search.addEventListener('input', renderProducts);
ui.grid.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add]');
  if (add) addProduct(add.dataset.add);
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
    const next = (state.cart[id] || 0) + Number(quantityButton.dataset.delta);
    if (next <= 0) delete state.cart[id]; else state.cart[id] = next;
    save(); renderCart();
  }
  if (removeButton) {
    const id = removeButton.dataset.remove;
    const line = cartSummary(state.cart, products).lines.find((item) => item.product.id === id);
    const name = line?.product.name;
    const quantity = line?.quantity ?? 0;
    delete state.cart[id]; save(); renderCart();
    notify(`${name} eliminado del pedido.`, {
      label: `${name} eliminado del pedido`,
      run: () => { state.cart = restoreRemovedLine(state.cart, id, quantity); save(); renderCart(); notify(`${name} recuperado en el pedido.`); },
    });
  }
});
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
  if (event.key === 'Tab' && ui.panel.classList.contains('is-open')) {
    const focusable = [...ui.panel.querySelectorAll('button:not(:disabled)')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (event.key === 'Tab' && ui.confirmation.classList.contains('is-open')) {
    const focusable = [...ui.confirmation.querySelectorAll('button:not(:disabled)')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

renderCategories(); renderProducts(); renderCart();
