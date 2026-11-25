# CaféU 2.0

Aplicación web responsive para consultar el menú de la cafetería universitaria, armar un pedido y recibir una confirmación. Prueba práctica integradora de Interacción Humano‑Computador (UTA · FISEI · Ingeniería de Software).

## Integrantes y aportes

| Integrante (GitHub) | Aportes principales |
|---|---|
| SalyC15 | Base UX y arquitectura inicial, flujo de pedido V1, documentación de IA y prototipos, recuperación de líneas, capa de presentación y backlog |
| Hlagua | Capa de aplicación (casos de uso), aviso de estado corrupto, README |
| Itsuna18 | Capa de dominio (Producto, Pedido, DetallePedido), pruebas automatizadas T1–T3, evidencias antes/después |
| carlitosgiovanniramos | Capa de infraestructura (repositorios), CSS Mobile First y correcciones de accesibilidad, documentación de arquitectura y trazabilidad |

El detalle verificable está en el historial de commits (`git log --format='%an %s'`).

## Instalación

Solo se necesita un navegador moderno y, para servir la app y ejecutar las pruebas, [Node.js](https://nodejs.org/) 18 o superior. No hay dependencias que instalar.

```bash
git clone https://github.com/SalyC15/Examen-IHC.git
cd Examen-IHC
```

## Ejecución

Los módulos ES no se cargan desde `file://`, así que la app se sirve en local:

```bash
npm start          # servidor estático sin dependencias → http://localhost:5173
```

Alternativa: `python -m http.server 5173`. El carrito y el último pedido se guardan en `localStorage` del navegador.

## Pruebas

```bash
npm test           # node --test: 14 pruebas (dominio + casos de uso T1, T2, T3 + persistencia)
```

También se pueden abrir en el navegador: `http://localhost:5173/tests/pruebas-automatizadas/`.

## Arquitectura

Cuatro capas en `src/`: **presentation** (pantallas, componentes, accesibilidad) → **application** (casos de uso) → **domain** (Producto, Pedido, DetallePedido y reglas) ← **infrastructure** (repositorio del catálogo y LocalStorage). `src/main.js` compone las capas. Detalle y dependencias en [docs/arquitectura.md](docs/arquitectura.md).

## Funcionalidades

- Catálogo por categorías y búsqueda tolerante a tildes y mayúsculas.
- Añadir productos, modificar cantidades (+/−), subtotales y total calculados en el dominio.
- Quitar una línea y recuperarla con “Deshacer” dentro del panel (accesible con teclado).
- Cancelar el pedido completo y recuperarlo desde el mismo panel.
- Confirmar el pedido (no se permite vacío) con número y resumen; deshacer la confirmación.
- Mobile First (375 / 768 / 1280 px), HTML semántico, navegación por teclado, foco visible, contraste AA y mensajes anunciados.
- Persistencia en LocalStorage con aviso si el estado guardado está dañado.

## Alcance y limitaciones

- Prototipo local: no procesa pagos, no envía pedidos a la cafetería, no tiene backend, autenticación ni inventario.
- Los datos persisten solo en el mismo navegador.
- **Evaluación con usuarios:** `evaluacion/resultados.csv` y `evidencias/observacion.csv` identifican explícitamente como `SIMULACION` los datos de práctica. No representan sesiones reales ni deben presentarse como tales. Las comprobaciones heurísticas, de accesibilidad y técnicas V1/V2 son reproducibles.
- Con 2 participantes las métricas son descriptivas y no generalizables.

## Evidencias y documentación

| Actividad | Documentos |
|---|---|
| 1. Análisis UX | [analisis-ux.md](docs/analisis-ux.md) (persona, touchpoints, momentos de verdad, curva emocional, matriz Nielsen/Gestalt) |
| 2. Requisitos e IA | [requisitos.md](docs/requisitos.md), [sitemap.md](docs/sitemap.md), [user-flow.md](docs/user-flow.md), [trazabilidad.md](docs/trazabilidad.md) |
| Prototipos | [wireframes.md](prototipos/wireframes.md), [version-v1](prototipos/version-v1/README.md) |
| 3. Arquitectura | [arquitectura.md](docs/arquitectura.md), [src/](src), [tests/pruebas-automatizadas/](tests/pruebas-automatizadas) |
| 4. Planificación | [plan.md](evaluacion/plan.md), [tareas.md](evaluacion/tareas.md), [consentimiento.md](evaluacion/consentimiento.md), [sus.md](evaluacion/sus.md) |
| 5. Heurística y accesibilidad | [heuristicas.md](evaluacion/heuristicas.md), [recorrido-cognitivo.md](evaluacion/recorrido-cognitivo.md), [accesibilidad.md](evaluacion/accesibilidad.md) |
| 6. Pilotaje y usuarios | [piloto.md](evaluacion/piloto.md), [resultados.csv](evaluacion/resultados.csv), [observacion.csv](evidencias/observacion.csv) |
| 7. Triangulación y validación | [metricas.md](evaluacion/metricas.md), [hallazgos.md](evaluacion/hallazgos.md), [backlog.md](evaluacion/backlog.md), [validacion-v2.md](evaluacion/validacion-v2.md), [evidencias/](evidencias/README.md) (antes / después) |
| Créditos de imágenes | [creditos-imagenes.md](docs/creditos-imagenes.md) |
