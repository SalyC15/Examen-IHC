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

## Requisitos no funcionales

| ID | Requisito | Criterio verificable |
|---|---|---|
| RNF1 | Responsive / Mobile First | Sin desbordamiento a 320 px, 768 px y escritorio |
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
│   └── Confirmar → Confirmación → Deshacer / Volver
└── Nuestra cafetería
```

## User flow

```text
Inicio → Menú → [filtrar / buscar] → Añadir producto → Aviso y contador
  → Mi pedido → [ajustar cantidad / quitar] → Ver total
  → Confirmar pedido → Identificador y resumen → Volver
                                         ↘ Deshacer → Carrito recuperado
```

## Wireframes textuales

1. **Menú (móvil):** encabezado compacto con marca y botón “Mi pedido”; título y texto de contexto; campo de búsqueda ancho; filtros desplazables; tarjetas en dos columnas con imagen ilustrativa, etiqueta, nombre, precio y botón Añadir.
2. **Pedido:** panel lateral (pantalla completa en móvil), título y cierre; lista con producto, precio unitario, controles de cantidad y quitar; total persistente al pie y botón confirmar.
3. **Confirmación:** diálogo centrado con icono de éxito, identificador/cantidad/total, botón volver y acción secundaria deshacer.

## Trazabilidad

| Requisito | Pantalla / módulo | Prueba |
|---|---|---|
| RF1/RF2 | Menú / `renderProducts` | A1, A2 |
| RF3 | Búsqueda / `normalize` | A3 |
| RF4 | Tarjeta / `addProduct` | A4 |
| RF5 | Panel / `renderCart` | A5 |
| RF6 | Panel / eliminación | A6 |
| RF7 | Diálogo / `checkout` | A7 |
| RNF1 | `styles.css` media queries | A8 |
| RNF2/RNF3 | HTML y manejadores de teclado | A9 |
| RNF4 | `readState` / `save` | A10 |
