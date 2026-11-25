# Evaluación heurística de Nielsen

Revisión experta preliminar de la versión implementada. Severidad: 0 no problema, 1 cosmético, 2 menor, 3 mayor, 4 crítico. Los hallazgos deberán contrastarse con uso real.

| # | Heurística | Revisión / hallazgo | Sev. | Acción |
|---|---|---|---:|---|
| 1 | Visibilidad del estado | Contador, aviso de añadido y total muestran cambios. Aviso desaparece a los 2,6 s y el foco no se desplaza al menú. | 1 | Confirmar duración y percepción en sesión |
| 2 | Correspondencia con el mundo real | Categorías y términos familiares; pago en cafetería explícito. | 0 | Mantener lenguaje concreto |
| 3 | Control y libertad | Se puede editar/quitar antes de confirmar; la notificación permite deshacer la última línea eliminada y la confirmación permite deshacer el pedido completo. Escape cierra panel. | 1 | Probar recuperación con teclado y táctil |
| 4 | Consistencia y estándares | Botones y controles mantienen estilo; navegación se comporta como anclas. | 1 | Revisar consistencia entre navegadores |
| 5 | Prevención de errores | Se impide confirmar carrito vacío y cantidad no positiva. Quitar una línea ofrece recuperación temporal. | 1 | Comprobar que la acción Deshacer se percibe antes de expirar |
| 6 | Reconocimiento antes que recuerdo | Precio y controles visibles junto al producto; filtros permanecen a la vista. | 1 | Verificar comprensión de etiquetas |
| 7 | Flexibilidad y eficiencia | Búsqueda y filtros disponibles; no hay favoritos ni pedido rápido. | 1 | No ampliar sin evidencia de necesidad |
| 8 | Diseño estético y minimalista | Jerarquía y espacios separan menú de controles de pedido. | 1 | Confirmar lectura en móvil |
| 9 | Ayudar a reconocer y recuperarse de errores | Búsqueda vacía explica estado y ofrece limpiar. V1: persistencia corrupta caía a estado inicial sin aviso; V2 avisa al iniciar. | 1 | Verificar redacción del aviso |
| 10 | Ayuda y documentación | Interfaz directa y aviso de pago; no existe FAQ ni información de alérgenos. | 2 | Añadir información antes de uso real |

## Cinco hallazgos principales con evidencia

| # | Hallazgo | Heurística | Evidencia | Sev. |
|---|---|---|---|---:|
| 1 | “Deshacer” inalcanzable con teclado y temporal | 3 Control y libertad | Inspección del ciclo de foco del panel (`atraparFoco`) y temporizador de 2,6 s en V1 | 3 |
| 2 | Mensaje de carrito vacío junto a productos | 1 Visibilidad / 4 Consistencia | `evidencias/antes/v1-t3-quitar-linea-movil.jpg` | 3 |
| 3 | Contraste insuficiente en textos auxiliares y foco | 8 Estética / accesibilidad | Medición WCAG en [accesibilidad.md](accesibilidad.md) | 2 |
| 4 | Controles +/− pequeños y próximos | 5 Prevención de errores | CSS V1: 25×25 px | 2 |
| 5 | Estado guardado corrupto sin explicación | 9 Recuperarse de errores | Prueba `persistencia: un estado corrupto…` | 2 |

Todos fueron corregidos en V2 y re‑comprobados (ver [validacion-v2.md](validacion-v2.md)).

La severidad refleja una inspección de código/diseño, no incidencia empírica ni consenso entre evaluadores.
