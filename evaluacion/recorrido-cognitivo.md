# Recorrido cognitivo (T2 y T3)

Perspectiva: estudiante con prisa, primera visita, móvil. Preguntas: ¿la persona sabrá qué hacer?, ¿verá la acción?, ¿entenderá el efecto?, ¿interpretará bien el feedback?

## T2 — Cambiar cantidad y verificar total

| Paso | Acción / respuesta esperada | ¿Sabe qué hacer? | ¿Ve y entiende el efecto? | Riesgo y mejora |
|---|---|---|---|---|
| 1 | Abrir “Mi pedido”; panel aparece | Sí, contador y etiqueta indican destino | Debe percibir el panel y su título | En pantalla pequeña validar que se reconoce como panel |
| 2 | Localizar latte y botón + | Parcial; controles junto a nombre. V1: botones de 25 px muy próximos; V2: 40 px | Número y total cambian; el total se anuncia | Comprobar anuncio con lector de pantalla |
| 3 | Leer total al pie | Sí, etiqueta “Total” | Total suma precio × cantidad | Verificar comprensión de coma decimal y símbolo USD |

## T3 — Retirar y confirmar el pedido restante

| Paso | Acción / respuesta esperada | ¿Sabe qué hacer? | ¿Ve y entiende el efecto? | Riesgo y mejora |
|---|---|---|---|---|
| 1 | Localizar “Quitar” en línea | Sí, acción está bajo controles | Línea desaparece, total se recalcula y aviso ofrece Deshacer | Registrar si la ubicación se confunde con ajustar cantidad |
| 2 | Recuperar latte desde el aviso | V1: el aviso está fuera del panel modal, no es alcanzable con Tab y expira a 2,6 s → **falla para teclado**. V2: “Deshacer” aparece dentro del panel y recibe el foco | Línea y total se restauran; mensaje “recuperado” | Corregido en V2 (H-03) |
| 3 | Confirmar pedido | Sí, botón al pie | Diálogo muestra unidades, total e identificador | Confirmar que entiende “pedido confirmado” y pago presencial |

## Resultado

Predicción experta para guiar observación: el paso de cantidad puede ser el punto más frágil por la proximidad de controles; la confirmación debe distinguir claramente pago de envío. Sin sesiones observadas, no se declara tasa de éxito.
