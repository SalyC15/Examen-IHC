// Capa de infraestructura: persistencia del carrito y del último pedido en LocalStorage.
export const STORAGE_KEY = 'cafeu-v2-state';

const vacio = () => ({ cart: {}, lastOrder: null });

/**
 * @param {Storage} storage  window.localStorage o un doble de prueba con getItem/setItem.
 * cargar() devuelve { estado, corrupto } para que la interfaz pueda avisar si se descartó un estado inválido.
 */
export function crearPedidoRepositorioLocal(storage, key = STORAGE_KEY) {
  return {
    cargar() {
      let raw;
      try { raw = storage.getItem(key); } catch { return { estado: vacio(), corrupto: false, disponible: false }; }
      if (raw == null) return { estado: vacio(), corrupto: false, disponible: true };
      try {
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object' || (data.cart && typeof data.cart !== 'object')) throw new Error('forma inválida');
        return { estado: { cart: data.cart || {}, lastOrder: data.lastOrder || null }, corrupto: false, disponible: true };
      } catch {
        return { estado: vacio(), corrupto: true, disponible: true };
      }
    },
    guardar(estado) {
      try { storage.setItem(key, JSON.stringify(estado)); return true; } catch { return false; }
    },
  };
}

/** Almacenamiento en memoria para pruebas o navegadores sin LocalStorage. */
export function crearAlmacenMemoria(inicial = {}) {
  const datos = new Map(Object.entries(inicial));
  return {
    getItem: (k) => (datos.has(k) ? datos.get(k) : null),
    setItem: (k, v) => { datos.set(k, String(v)); },
  };
}
