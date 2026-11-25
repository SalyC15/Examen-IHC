# Hallazgos y backlog

## Registro de hallazgos

Los hallazgos siguientes proceden de la **simulación sintética solicitada**, no de sesiones reales. Cada observación es parte del escenario modelado.

| ID | Evidencia observada | Tarea | Severidad | Impacto | Estado |
|---|---|---|---:|---|---|
| H-01 | En escenario P01/P02 V1, quitar latte deja la tarea de recuperación sin salida visible | T3 | 3 | Bloquea recuperar artículo eliminado; 0/2 éxitos modelados | Corregido en V2: acción Deshacer temporal en aviso |
| H-02 | En escenario P02 V1, no percibe si cambió el total después de ajustar cantidad | T2 | 2 | Duda antes de confirmar, relevante para lector de pantalla | Corregido en V2: total usa `aria-live="polite"` |

## Backlog inicial basado en inspección

| Prioridad | Hipótesis a validar | Criterio de cierre |
|---|---|---|
| Cerrado en V2 | Recuperar línea retirada por error | La acción Deshacer restaura cantidad y total |
| Cerrado en V2 | Anunciar total actualizado | El nodo del total anuncia sus cambios a tecnologías de asistencia |
| P1 | Diálogo puede no explicar que el prototipo no procesa pago | Validar interpretación con participantes reales |
| P2 | Persistencia inválida podría vaciar carrito sin explicación | Estado corrupto se detecta y el mensaje no confunde |
| P2 | Contraste de texto auxiliar requiere medición | Todos los textos cumplen contraste elegido o se ajusta paleta |

Las correcciones de V2 se implementan en la app; la cobertura automatizada prueba la restauración y el cálculo del dominio. La parte de anuncios de accesibilidad requiere lector de pantalla. Los hallazgos simulados no establecen frecuencia real.
