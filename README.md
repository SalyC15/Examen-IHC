# CaféU 2.0

Aplicación web responsive para consultar el menú y armar un pedido de cafetería universitaria. Proyecto académico de Interacción Humano-Computador.

## Ejecutar

Abrir `index.html` en un navegador moderno. No requiere instalación ni conexión. Los productos, el carrito y los pedidos se guardan en `localStorage` de este navegador.

## Funcionalidades

- Catálogo por categorías y búsqueda sin distinguir mayúsculas, tildes ni caracteres Unicode equivalentes.
- Añadir productos, modificar cantidades, ver subtotales y total, y quitar elementos.
- Confirmar pedido con resumen y número de confirmación; recuperar el último pedido eliminado accidentalmente durante esta sesión.
- Diseño adaptable, navegación por teclado, etiquetas accesibles y mensajes de estado anunciados.

## Arquitectura

Aplicación estática sin dependencias: `index.html` aporta estructura semántica, `styles.css` la presentación y `src/app.js` el estado y los casos de uso. `src/products.js` contiene datos del catálogo. La capa de infraestructura persiste estado en localStorage. El detalle está en [docs/arquitectura.md](docs/arquitectura.md).

## Pruebas

Abrir `tests/index.html` en el navegador para ejecutar pruebas funcionales sin dependencias. La guía de aceptación está en `evaluacion/tareas.md`.

## Alcance y limitaciones

Es un prototipo local, no procesa pagos ni transmite pedidos a una cafetería. Los datos persisten solo en el mismo navegador. No hay backend, autenticación ni inventario en tiempo real. La evaluación con participantes debe efectuarse con consentimiento y registrarse con datos observados; no se incluyen resultados simulados.

## Documentación de IHC

- [Análisis de usuario y contexto](docs/analisis-ux.md)
- [Requisitos, mapa y flujo](docs/requisitos.md)
- [Arquitectura](docs/arquitectura.md)
- [Plan de evaluación](evaluacion/plan.md)
- [Tareas y protocolo](evaluacion/tareas.md)
- [Consentimiento](evaluacion/consentimiento.md)
- [Evaluación heurística](evaluacion/heuristicas.md)
- [Recorrido cognitivo](evaluacion/recorrido-cognitivo.md)
- [Accesibilidad](evaluacion/accesibilidad.md)
- [Registro de resultados](evaluacion/resultados.csv)
- [Métricas](evaluacion/metricas.md)
- [Hallazgos y backlog](evaluacion/hallazgos.md)
- [Validación V2](evaluacion/validacion-v2.md)

## Evidencia

La carpeta `evidencias/` contiene plantillas de observación. Añadir capturas antes/después y resultados únicamente después de ejecutar las sesiones reales.
