// Capa de infraestructura: fuente de datos del catálogo.
// Hoy lee un arreglo local; podría sustituirse por una API sin cambiar la capa de aplicación.
import { crearProducto } from '../domain/entidades.js';
import { products as datos, categories } from './catalogo-datos.js';

export function crearCatalogoRepositorio(fuente = datos, categorias = categories) {
  const productos = Object.freeze(fuente.map(crearProducto));
  return {
    listar: () => productos,
    categorias: () => categorias,
    buscarPorId: (id) => productos.find((producto) => producto.id === id) || null,
  };
}
