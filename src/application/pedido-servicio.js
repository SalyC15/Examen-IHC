// Capa de aplicación: casos de uso de CaféU. Orquesta dominio e infraestructura; no toca el DOM.
import { crearPedido } from '../domain/entidades.js';
import { cartSummary, changeQuantity, filterProducts, removeLine, restoreRemovedLine } from '../domain/reglas.js';

export function crearPedidoServicio({ catalogo, repositorio, generarId = () => `CU-${Date.now().toString().slice(-6)}` }) {
  const carga = repositorio.cargar();
  const estado = carga.estado;
  const persistir = () => repositorio.guardar(estado);
  const productos = () => catalogo.listar();

  return {
    /** Indica si al iniciar se descartó un estado guardado ilegible. */
    estadoInicialCorrupto: carga.corrupto,
    categorias: () => catalogo.categorias(),

    /** CU1: buscar productos por categoría y texto (tolerante a tildes y mayúsculas). */
    buscarProductos: (categoria, consulta) => filterProducts(productos(), categoria, consulta),

    /** CU2: agregar una unidad de un producto. */
    agregarProducto(id) {
      const producto = catalogo.buscarPorId(id);
      if (!producto) return null;
      estado.cart = changeQuantity(estado.cart, id, 1);
      persistir();
      return producto;
    },

    /** CU3: modificar cantidad (+1 / -1). */
    cambiarCantidad(id, delta) {
      estado.cart = changeQuantity(estado.cart, id, delta);
      persistir();
      return this.resumen();
    },

    /** CU4: eliminar una línea; devuelve lo necesario para recuperarla. */
    eliminarLinea(id) {
      const linea = this.resumen().lines.find((item) => item.product.id === id);
      if (!linea) return null;
      estado.cart = removeLine(estado.cart, id);
      persistir();
      return { id, quantity: linea.quantity, product: linea.product };
    },

    /** CU5: recuperar una línea eliminada por error. */
    recuperarLinea(eliminada) {
      if (!eliminada) return this.resumen();
      estado.cart = restoreRemovedLine(estado.cart, eliminada.id, eliminada.quantity);
      persistir();
      return this.resumen();
    },

    /** CU8: cancelar todo el pedido actual; devuelve una copia para deshacer la acción. */
    cancelarPedido() {
      if (!Object.keys(estado.cart).length) return null;
      const cancelado = { ...estado.cart };
      estado.cart = {};
      persistir();
      return cancelado;
    },

    /** Recupera el carrito completo cancelado mientras la acción siga disponible en la interfaz. */
    recuperarPedidoCancelado(cancelado) {
      if (!cancelado || typeof cancelado !== 'object') return this.resumen();
      estado.cart = { ...cancelado };
      persistir();
      return this.resumen();
    },

    /** CU6: confirmar el pedido. Regla: no se confirma un pedido vacío. */
    confirmarPedido() {
      const { lines } = this.resumen();
      if (!lines.length) return null;
      const pedido = crearPedido(generarId(), lines);
      estado.lastOrder = { id: pedido.id, count: pedido.count, total: pedido.total, cart: { ...estado.cart } };
      estado.cart = {};
      persistir();
      return pedido;
    },

    /** CU7: deshacer el último pedido confirmado y devolver sus productos al carrito. */
    deshacerPedido() {
      if (!estado.lastOrder) return false;
      estado.cart = { ...estado.lastOrder.cart };
      estado.lastOrder = null;
      persistir();
      return true;
    },

    resumen: () => cartSummary(estado.cart, productos()),
    cantidadDe: (id) => estado.cart[id] || 0,
  };
}
