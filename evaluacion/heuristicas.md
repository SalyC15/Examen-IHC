# Evaluación heurística de Nielsen

Revisión experta preliminar de la versión implementada. Severidad: 0 no problema, 1 cosmético, 2 menor, 3 mayor, 4 crítico. Los hallazgos deberán contrastarse con uso real.

| # | Heurística | Revisión / hallazgo | Sev. | Acción |
|---|---|---|---:|---|
| 1 | Visibilidad del estado | Contador, aviso de añadido y total muestran cambios. Aviso desaparece a los 2,6 s y el foco no se desplaza al menú. | 1 | Confirmar duración y percepción en sesión |
| 2 | Correspondencia con el mundo real | Categorías y términos familiares; pago en cafetería explícito. | 0 | Mantener lenguaje concreto |
| 3 | Control y libertad | Se puede editar/quitar antes de confirmar; deshacer pedido en confirmación. Escape cierra panel. | 1 | Probar recuperación con teclado y táctil |
| 4 | Consistencia y estándares | Botones y controles mantienen estilo; navegación se comporta como anclas. | 1 | Revisar consistencia entre navegadores |
| 5 | Prevención de errores | Se impide confirmar carrito vacío y cantidad no positiva. No hay confirmación para quitar línea. | 2 | Considerar deshacer eliminación individual |
| 6 | Reconocimiento antes que recuerdo | Precio y controles visibles junto al producto; filtros permanecen a la vista. | 1 | Verificar comprensión de etiquetas |
| 7 | Flexibilidad y eficiencia | Búsqueda y filtros disponibles; no hay favoritos ni pedido rápido. | 1 | No ampliar sin evidencia de necesidad |
| 8 | Diseño estético y minimalista | Jerarquía y espacios separan menú de controles de pedido. | 1 | Confirmar lectura en móvil |
| 9 | Ayudar a reconocer y recuperarse de errores | Búsqueda vacía explica estado y ofrece limpiar. Persistencia corrupta cae a estado inicial sin aviso. | 2 | Añadir aviso discreto si se detecta estado inválido |
| 10 | Ayuda y documentación | Interfaz directa y aviso de pago; no existe FAQ ni información de alérgenos. | 2 | Añadir información antes de uso real |

La severidad refleja una inspección de código/diseño, no incidencia empírica ni consenso entre evaluadores.
