# Matriz de trazabilidad

Requisito → pantalla/componente → caso de uso → prueba automatizada o comprobación → tarea de evaluación.

| ID | Requisito | Pantalla / componente | Caso de uso / módulo | Prueba | Tarea |
|---|---|---|---|---|---|
| RF1 | Catálogo con atributos | Menú · `TarjetaProducto` | `catalogo-repositorio.listar` | `entidades rechazan precio…` | T1 |
| RF2 | Filtro por categoría | Menú · `BotonCategoria` | `buscarProductos` | `filtra productos de la categoría…` | T1 |
| RF3 | Buscar ignorando tildes/mayúsculas | Menú · buscador | `filterProducts` / `normalize` | `busca sin distinguir…`, `T1: buscar "LATTE"…` | T1 |
| RF4 | Añadir producto | Menú · `[data-add]` | `agregarProducto` | `T1: … agregarlo al pedido` | T1 |
| RF5 | Ajustar unidades y calcular total | Mi pedido · `LineaPedido` | `cambiarCantidad` / `cartSummary` | `T2: modificar cantidad a dos…`, `calcula unidades, subtotal y total…` | T2 |
| RF6 | Quitar y recuperar línea | Mi pedido · `[data-remove]`, `#cart-undo` | `eliminarLinea` / `recuperarLinea` | `T3: eliminar latte, recuperarlo…` | T3 |
| RF7 | Confirmar pedido (no vacío) y deshacerlo | Confirmación · `#confirmation` | `confirmarPedido` / `deshacerPedido` | `T3…`, `no se confirma un pedido vacío`, `deshacer pedido…` | T3 |
| RNF1 | Responsive Mobile First | `styles.css` (`min-width`) | — | Comprobación 375/768/1280 px sin desbordamiento | T1–T3 |
| RNF2 | Teclado y foco visible | Panel, diálogo, buscador | `atraparFoco` | Comprobación manual (accesibilidad.md) | T2, T3 |
| RNF3 | Mensajes y etiquetas accesibles | `role=status`, `aria-live`, labels | — | Inspección de árbol accesible | T1–T3 |
| RNF4 | Persistencia y recuperación de errores | — | `pedido-repositorio-local` | `persistencia: …recarga`, `persistencia: …corrupto` | — |

## Problema → corrección → resultado

| Hallazgo | Corrección | Verificación |
|---|---|---|
| H-03 Deshacer fuera del panel | `#cart-undo` en panel | Foco en “Deshacer”, validacion-v2.md |
| H-04 Mensaje vacío con productos | `[hidden]` | Capturas antes/después |
| H-05 Contraste | Paleta | Tabla de ratios |
| H-06 Áreas táctiles | 40 px | `getComputedStyle` |
| H-08 Estado corrupto | Aviso | Prueba automatizada |
