# Análisis de usuario y experiencia

## Persona provisional

**Alex, estudiante universitario/a (20 años).** Se desplaza entre clases, consulta el menú desde el teléfono y dispone de pocos minutos. Necesita reconocer con rapidez opciones, precio y cantidad; agradece poder revisar el pedido antes de confirmarlo. Esta persona es una hipótesis de diseño, no el resultado de una entrevista. Debe contrastarse con estudiantes reales.

## Contexto y necesidades

- Uso móvil en pausas cortas y, posiblemente, con una sola mano.
- Ruido, prisa y conectividad variable en el campus.
- Reconocer productos por nombre y categoría; encontrar por una palabra aproximada.
- Evitar pedidos con cantidad equivocada y confirmar que la selección quedó guardada.
- Poder corregir o recuperar una acción accidental antes de dar el pedido por terminado.

## Touchpoints

1. Descubre el enlace de CaféU.
2. Abre el menú en el teléfono.
3. Recorre categorías.
4. Busca una bebida o acompañamiento.
5. Consulta nombre, descripción y precio.
6. Añade un artículo.
7. Abre el resumen del pedido.
8. Ajusta cantidad o elimina un artículo.
9. Revisa el total.
10. Confirma y lee el número del pedido.

## Momentos de verdad

- **Encontrar lo que busca:** búsqueda y filtros muestran una respuesta clara sin perder el contexto.
- **Revisar antes de comprometerse:** las líneas del pedido, las cantidades y el total permiten detectar errores.

## Curva emocional hipotética

`Descubrimiento +1 → búsqueda +1 → selección +2 → revisión +1 → confirmación +2`

Hipótesis a validar, en escala de -2 (frustración) a +2 (satisfacción): la exploración genera interés; los errores de búsqueda o una cantidad difícil de corregir podrían bajar la emoción. Registrar la curva individual tras cada tarea; no presentarla como resultado observado.

| Fase hipotética | Descubrimiento | Búsqueda | Selección | Revisión | Confirmación |
|---|---:|---:|---:|---:|---:|
| Emoción esperada (-2 a +2) | +1 | +1 | +2 | +1 | +2 |

## Matriz de problemas inicial

| Problema hipotético | Principio relacionado | Respuesta de diseño | Evidencia pendiente |
|---|---|---|---|
| No se nota si un producto fue añadido | Visibilidad del estado | Aviso anunciado y contador actualizado | Observar si se percibe el aviso |
| Cantidad incorrecta difícil de corregir | Control y libertad | Controles +/−, quitar y deshacer pedido | T2/T3 observados |
| No se sabe cuánto costará | Reconocimiento del estado | Precio por producto, subtotal y total | Éxito al estimar/verificar total |
| Búsqueda exacta frágil | Flexibilidad y eficiencia | Búsqueda ignora tildes y mayúsculas | Probar consulta sin tilde |
| Error de búsqueda parece falta de catálogo | Ayuda ante errores | Estado vacío con acción de limpiar | Observar recuperación |
| Confirmar parece cobrar en línea | Correspondencia con mundo real | Aviso visible: pago en cafetería | Preguntar interpretación |

## Principios Gestalt en la interfaz

- **Proximidad:** nombre, precio, descripción y acción aparecen juntos en cada tarjeta; se facilita reconocer que pertenecen al mismo producto.
- **Región común y semejanza:** los filtros activos comparten tratamiento visual; las líneas del pedido quedan agrupadas dentro de un mismo panel.
- **Figura-fondo:** panel y diálogo destacan sobre un fondo oscurecido, dando prioridad a la tarea modal.
- **Continuidad:** filtros en una fila y tarjetas en una cuadrícula sugieren un recorrido de exploración consistente.

Son decisiones de composición a validar con participantes; no prueban por sí solas comprensión.
