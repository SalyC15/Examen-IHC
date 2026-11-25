# CaféU 2.0

Aplicación web responsive para consultar el menú y armar un pedido de cafetería universitaria. Proyecto académico de Interacción Humano-Computador.

## Ejecutar

Abrir `index.html` en un navegador moderno. No requiere instalación ni conexión. Los productos, el carrito y los pedidos se guardan en `localStorage` de este navegador.

## Funcionalidades

- Catálogo por categorías y búsqueda sin distinguir mayúsculas, tildes ni caracteres Unicode equivalentes.
- Añadir productos, modificar cantidades, ver subtotales y total, y quitar elementos.
- Recuperar una línea recién eliminada con la acción temporal “Deshacer”; deshacer también un pedido confirmado.
- Diseño adaptable, navegación por teclado, etiquetas accesibles y mensajes de estado anunciados.

## Arquitectura

Aplicación estática sin dependencias: `index.html` aporta estructura semántica, `styles.css` la presentación y `src/app.js` el estado y los casos de uso. `src/products.js` contiene datos del catálogo. La capa de infraestructura persiste estado en localStorage. El detalle está en [docs/arquitectura.md](docs/arquitectura.md).

## Pruebas

Ejecutar `npm test` para las pruebas funcionales del dominio, o abrir `tests/index.html` en un navegador. La guía de aceptación está en `evaluacion/tareas.md`.

## Alcance y limitaciones

Es un prototipo local, no procesa pagos ni transmite pedidos a una cafetería. Los datos persisten solo en el mismo navegador. No hay backend, autenticación ni inventario en tiempo real. La carpeta de evaluación contiene una simulación sintética solicitada por el equipo; no son resultados de participantes reales y deben sustituirse si se realizan sesiones.

## Documentación de IHC

- [Análisis de usuario y contexto](docs/analisis-ux.md)
- [Requisitos, mapa y flujo](docs/requisitos.md)
- [Sitemap](docs/sitemap.md)
- [User flow](docs/user-flow.md)
- [Trazabilidad](docs/trazabilidad.md)
- [Arquitectura](docs/arquitectura.md)
- [Wireframes](prototipos/wireframes.md)
- [Plan de evaluación](evaluacion/plan.md)
- [Tareas y protocolo](evaluacion/tareas.md)
- [Registro del piloto P00](evaluacion/piloto.md)
- [Consentimiento](evaluacion/consentimiento.md)
- [Evaluación heurística](evaluacion/heuristicas.md)
- [Recorrido cognitivo](evaluacion/recorrido-cognitivo.md)
- [Accesibilidad](evaluacion/accesibilidad.md)
- [Registro de resultados](evaluacion/resultados.csv)
- [Métricas](evaluacion/metricas.md)
- [Hallazgos y backlog](evaluacion/hallazgos.md)
- [Validación V2](evaluacion/validacion-v2.md)

## Evidencia

La carpeta `evidencias/` contiene registros marcados como simulación. Reemplazarlos por observaciones reales únicamente si se llevan a cabo sesiones con consentimiento.
