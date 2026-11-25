# Requisitos y arquitectura de información

## Requisitos funcionales

| ID | Requisito | Criterio verificable |
|---|---|---|
| RF1 | Mostrar productos agrupables por categorías | Menú carga tarjetas con nombre, descripción y precio |
| RF2 | Filtrar por categoría | Cambiar categoría actualiza tarjetas y estado del control |
| RF3 | Buscar de forma tolerante a tildes y mayúsculas | Consulta equivalente encuentra el mismo producto |
| RF4 | Agregar producto al pedido | Contador y carrito muestran el producto añadido |
| RF5 | Cambiar cantidad y total | +/− actualiza cantidades y total |
| RF6 | Quitar una línea | Quitar elimina solo el producto indicado |
| RF7 | Confirmar el pedido | Resumen muestra identificador, unidades y total |
| RF8 | Cancelar el pedido completo antes de confirmar | El carrito queda vacío y la persona puede deshacer la cancelación para restaurarlo |

## Requisitos no funcionales

| ID | Requisito | Criterio verificable |
|---|---|---|
| RNF1 | Responsive / Mobile First | Sin desbordamiento a móvil (375 px), tableta (768 px) y escritorio |
| RNF2 | Accesibilidad de teclado | Acciones alcanzables, foco visible y Escape cierra paneles |
| RNF3 | Estado perceptible | Resultado de búsqueda y mensajes se anuncian a tecnologías de asistencia |
| RNF4 | Persistencia local | Recarga conserva carrito en el mismo navegador |
| RNF5 | Rendimiento y resiliencia | App carga sin backend y no depende de recursos de productos remotos |

## Sitemap

```text
Inicio
├── Menú
│   ├── Filtro por categoría
│   ├── Búsqueda
│   └── Tarjeta de producto → Añadir
├── Mi pedido (panel)
│   ├── Cantidad + / −
│   ├── Quitar
│   ├── Cancelar pedido → Carrito vacío → Deshacer cancelación
│   └── Confirmar → Confirmación → Deshacer pedido / Volver
└── Nuestra cafetería
```

## User flow

```text
Inicio → Menú → [filtrar / buscar] → Añadir producto → Aviso y contador
  → Mi pedido → [ajustar cantidad / quitar / cancelar pedido] → Ver total
       ├── Cancelar → Carrito vacío → Deshacer cancelación → Pedido restaurado
       └── Confirmar pedido → Identificador y resumen → Volver
                                           ↘ Deshacer pedido → Carrito recuperado
```

## Wireframes textuales

1. **Menú (móvil):** encabezado compacto con marca y botón “Mi pedido”; título y texto de contexto; campo de búsqueda ancho; filtros desplazables; tarjetas en dos columnas con imagen ilustrativa, etiqueta, nombre, precio y botón Añadir.
2. **Pedido:** panel lateral (pantalla completa en móvil), título y cierre; lista con producto, precio unitario, controles de cantidad y quitar; total persistente al pie y botones para confirmar o cancelar el pedido. La cancelación puede deshacerse desde el panel.
3. **Confirmación:** diálogo centrado con icono de éxito, identificador/cantidad/total, botón volver y acción secundaria deshacer.

## Trazabilidad

| Requisito | Pantalla / módulo | Prueba |
|---|---|---|
| RF1/RF2 | Menú / `renderProducts` | Dominio: filtra por categoría |
| RF3 | Búsqueda / `normalize` | Dominio y T1: consulta sin tildes/mayúsculas |
| RF4 | Tarjeta / `[data-add]` | Caso de uso T1: agregar latte |
| RF5 | Panel / `renderCart` | Caso de uso T2: cantidad y total |
| RF6 | Panel / `[data-remove]`, `#cart-undo` | Caso de uso T3: quitar y recuperar línea |
| RF7 | Diálogo / `checkout` | Caso de uso T3: confirmar y deshacer pedido |
| RF8 | Panel / `#cancel-order` | Caso de uso: cancelar y restaurar pedido completo |
| RNF1 | `styles.css` media queries | A8 |
| RNF2/RNF3 | HTML y manejadores de teclado | A9 |
| RNF4 | `cargar` / `guardar` de `pedido-repositorio-local` | Pruebas de persistencia y estado corrupto |
