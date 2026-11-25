# Arquitectura de software

## Decisión

Aplicación web estática en JavaScript nativo con módulos ES, organizada en cuatro capas. No hay paso de compilación ni dependencias: el catálogo es pequeño y el objetivo es un prototipo evaluable. Las capas se comunican mediante funciones e interfaces simples, de modo que la persistencia local puede sustituirse por una API sin tocar dominio ni presentación.

```text
src/
├── main.js                         Punto de composición (conecta las capas)
├── presentation/                   Presentación
│   ├── app.js                      Eventos, renderizado, foco, diálogos, avisos
│   └── componentes.js              Componentes reutilizables: BotonCategoria, TarjetaProducto,
│                                   LineaPedido, ResultadosVacios, atraparFoco
├── application/                    Aplicación (casos de uso)
│   └── pedido-servicio.js          buscarProductos, agregarProducto, cambiarCantidad,
│                                   eliminarLinea, recuperarLinea, cancelarPedido, recuperarPedidoCancelado,
│                                   confirmarPedido, deshacerPedido
├── domain/                         Dominio
│   ├── entidades.js                Producto, DetallePedido, Pedido + invariantes
│   └── reglas.js                   normalize, filterProducts, cartSummary, changeQuantity, …
└── infrastructure/                 Infraestructura
    ├── catalogo-datos.js           Datos del catálogo y rutas de assets/menu/*.jpg
    ├── catalogo-repositorio.js     Repositorio de productos (listar, buscarPorId, categorias)
    └── pedido-repositorio-local.js Repositorio de carrito/pedido en LocalStorage
```

## Dependencias entre capas

```text
Presentación ──► Aplicación ──► Dominio ◄── Infraestructura
      ▲                ▲                          │
      └──── main.js ───┴──── inyecta repositorios ┘
```

- **Presentación** solo conoce el servicio de aplicación (recibido en `iniciarApp(servicio)`); no calcula totales ni lee LocalStorage.
- **Aplicación** orquesta casos de uso; recibe `catalogo` y `repositorio` por parámetro (inyección de dependencias), por eso las pruebas usan un almacén en memoria.
- **Dominio** es puro: no importa nada de otras capas, no toca el DOM ni el almacenamiento. Contiene las reglas de negocio:
  - Producto conserva la ruta local de su imagen para presentación y carrito;
  - el precio de un producto es positivo;
  - la cantidad de un `DetallePedido` es un entero positivo; bajar a 0 retira la línea;
  - el subtotal y el total se calculan desde el precio del catálogo (redondeo a centavos), nunca desde el texto mostrado;
  - un `Pedido` no puede confirmarse vacío;
  - la búsqueda ignora tildes y mayúsculas (normalización Unicode NFD).
- **Infraestructura** implementa la persistencia (`cargar`/`guardar` bajo la clave `cafeu-v2-state`) y la fuente del catálogo. Depende del dominio solo para construir `Producto` válidos.
- **`main.js`** es el único módulo que conoce todas las capas; si LocalStorage no está disponible usa un almacén en memoria.

## Persistencia y fallos

LocalStorage es una conveniencia del prototipo: puede borrarse y no sincroniza dispositivos. `cargar()` distingue estado vacío, estado válido y estado corrupto; en el último caso la interfaz avisa “No pudimos recuperar tu pedido anterior”. `guardar()` no lanza excepciones si el almacenamiento está lleno o bloqueado. Una integración real debería añadir una API con validación de precios en servidor, inventario y manejo de errores de red; bastaría con otro repositorio que implemente `cargar`/`guardar`.

## Presentación: Mobile First y accesibilidad

- `styles.css` define los estilos base para teléfonos y amplía con `@media (min-width: 601px)` (tableta) y `@media (min-width: 901px)` (escritorio).
- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `aside role="dialog"`), enlace “Saltar al contenido”, etiquetas accesibles en botones de icono.
- Foco visible en todos los controles, retorno de foco al cerrar paneles, Escape, ciclo de Tab en diálogos e `inert` en contenido modal oculto.
- `aria-live` para resultados de búsqueda, total, avisos y la zona de “Deshacer”.
- `prefers-reduced-motion` desactiva transiciones.

## Pruebas

`npm test` ejecuta `tests/pruebas-automatizadas/` con el runner nativo de Node (sin dependencias): reglas del dominio, entidades, los casos de uso T1, T2 y T3, cancelación/restauración del pedido, rutas de imágenes y persistencia/estado corrupto. `tests/pruebas-automatizadas/index.html` ejecuta las pruebas de dominio en el navegador.
