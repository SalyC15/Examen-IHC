// Capa de dominio: entidades y reglas de negocio. No depende del DOM ni del almacenamiento.

export class ErrorDominio extends Error {}

/** Producto del catálogo. Inmutable una vez creado. */
export function crearProducto({ id, name, description = '', price, category, tag = '', emoji = '', tone = '' }) {
  if (!id || !name) throw new ErrorDominio('El producto necesita id y nombre.');
  if (!Number.isFinite(price) || price <= 0) throw new ErrorDominio(`Precio inválido para ${name}.`);
  if (!category) throw new ErrorDominio(`Categoría requerida para ${name}.`);
  return Object.freeze({ id, name, description, price, category, tag, emoji, tone });
}

/** Cantidad válida: entero positivo. */
export function esCantidadValida(cantidad) {
  return Number.isInteger(cantidad) && cantidad > 0;
}

/** DetallePedido: un producto con su cantidad y subtotal calculado desde el precio del catálogo. */
export function crearDetallePedido(producto, cantidad) {
  if (!producto) throw new ErrorDominio('Producto inexistente.');
  if (!esCantidadValida(cantidad)) throw new ErrorDominio('La cantidad debe ser un entero positivo.');
  return Object.freeze({ product: producto, quantity: cantidad, subtotal: redondear(producto.price * cantidad) });
}

/** Pedido confirmado: identificador, detalles, unidades y total. No se puede confirmar vacío. */
export function crearPedido(id, detalles, fecha = new Date().toISOString()) {
  if (!detalles.length) throw new ErrorDominio('No se puede confirmar un pedido vacío.');
  return Object.freeze({
    id,
    fecha,
    detalles,
    count: detalles.reduce((suma, detalle) => suma + detalle.quantity, 0),
    total: redondear(detalles.reduce((suma, detalle) => suma + detalle.subtotal, 0)),
  });
}

export function redondear(valor) {
  return Math.round(valor * 100) / 100;
}
