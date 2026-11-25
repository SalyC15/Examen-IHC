# Hallazgos y backlog

## Registro de hallazgos

Los hallazgos siguientes proceden de la **simulación sintética solicitada**, no de sesiones reales. Cada observación es parte del escenario modelado.

| ID | Evidencia del escenario simulado | Tarea | Severidad | Impacto modelado | Estado |
|---|---|---|---:|---|---|
| H-01 | En escenario P01/P02 V1, quitar latte deja la tarea de recuperación sin salida visible | T3 | 3 | Bloquea recuperar artículo eliminado; 0/2 éxitos modelados | Corregido en V2: acción Deshacer temporal en aviso |
| H-02 | En escenario P02 V1, no percibe si cambió el total después de ajustar cantidad | T2 | 2 | Duda antes de confirmar, relevante para lector de pantalla | Corregido en V2: total usa `aria-live="polite"` |

## Hallazgos de inspección y verificación técnica (evidencia reproducible)

Estos hallazgos no dependen de participantes: se reproducen abriendo V1 (commit `19d0b74`) y se comparan con V2. Capturas de la comparación guardadas en `../evidencias/antes/` y `../evidencias/despues/` (commit de evidencia `74631f1`).

| ID | Evidencia | Heurística / criterio | Sev. | Corrección V2 |
|---|---|---|---:|---|
| H-03 | Con el panel abierto, Tab cicla solo dentro del panel; el botón “Deshacer” está en `#toast`, fuera del panel, y se oculta a los 2,6 s | H3 Control y libertad; WCAG 2.1.1 Teclado, 2.2.1 Tiempo ajustable | 3 | Zona `#cart-undo` dentro del panel, recibe foco, no expira |
| H-04 | Captura V1: “Tu pedido está esperando algo rico” visible con un espresso en el carrito | H1 Visibilidad del estado; H4 Consistencia | 3 | `[hidden]{display:none!important}` |
| H-05 | Contraste medido: #777d74/#fbfaf6 = 4,05:1; #a57954/#f0eee5 = 3,31:1; blanco/#df8e57 = 2,58:1; foco #e9955e = 2,25:1 | WCAG 1.4.3 y 1.4.11 | 2 | Paleta ajustada: 5,67:1, 4,78:1, 5,00:1, 4,79:1 |
| H-06 | Botones +/− de 25×25 px separados 9 px | H5 Prevención de errores; WCAG 2.5.8 | 2 | 40×40 px |
| H-07 | `.search-box input{outline:0}` anula el foco del buscador | WCAG 2.4.7 Foco visible | 2 | `.search-box:focus-within` |
| H-08 | JSON inválido en `cafeu-v2-state` vacía el carrito sin explicación | H9 Recuperarse de errores | 2 | Aviso al iniciar (prueba automatizada) |

## Backlog

El backlog priorizado completo está en [backlog.md](backlog.md).

### Resumen anterior

| Prioridad | Hipótesis a validar | Criterio de cierre |
|---|---|---|
| Cerrado en V2 | Recuperar línea retirada por error | La acción Deshacer restaura cantidad y total |
| Cerrado en V2 | Anunciar total actualizado | El nodo del total anuncia sus cambios a tecnologías de asistencia |
| P1 | Diálogo puede no explicar que el prototipo no procesa pago | Validar interpretación con participantes reales |
| P2 | Persistencia inválida podría vaciar carrito sin explicación | Estado corrupto se detecta y el mensaje no confunde |
| P2 | Contraste de texto auxiliar requiere medición | Todos los textos cumplen contraste elegido o se ajusta paleta |

Las correcciones de V2 se implementan en la app; la cobertura automatizada prueba la restauración y el cálculo del dominio. La parte de anuncios de accesibilidad requiere lector de pantalla. Los hallazgos simulados no establecen frecuencia real.
