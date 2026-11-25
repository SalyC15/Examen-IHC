# Matriz de trazabilidad

| ID | Requisito | Pantalla / componente | Prueba |
|---|---|---|---|
| RF1 | Catálogo con atributos | Tarjeta en `#product-grid` | F1 catálogo |
| RF2 | Filtro por categoría | `#categories` | F2 filtro |
| RF3 | Buscar ignorando tildes/capitalización | `filterProducts` | F3 búsqueda |
| RF4 | Añadir producto | `[data-add]` | F4 carrito |
| RF5 | Ajustar unidades y calcular total | `cartSummary` y panel | F5 cantidad/total |
| RF6 | Quitar línea | `[data-remove]` | F6 eliminación |
| RF7 | Confirmar pedido | `checkout` y `#confirmation` | F7 confirmación |
| RNF1 | Reflow responsive | Media queries | F8 viewport móvil |
| RNF2 | Navegación y foco por teclado | Foco visible, Escape y ciclo modal | F9 teclado |
| RNF3 | Mensajes con etiquetas accesibles | `role=status`, labels y headings | F10 inspección de árbol accesible |
| RNF4 | Persistencia del pedido | `readState` / `save` | F11 recarga |

Las pruebas automatizadas cubren lógica de categoría, búsqueda tolerante a tildes y mayúsculas, cálculo de unidades/total y exclusión de estado inválido. La interacción de interfaz y los criterios restantes requieren comprobación manual y registro.
