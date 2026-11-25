# Plan de evaluación

## Propósito

Comprobar si estudiantes pueden localizar, modificar y confirmar una compra breve; medir eficacia, eficiencia y satisfacción; priorizar problemas frente a principios heurísticos.

## Participantes y ética

Esta entrega reporta una **simulación académica**, no sesiones reales ni estudiantes reclutados. Según la indicación docente posterior comunicada por el equipo, se modela el escenario en vez de reclutar participantes; los perfiles P01/P02 son ficticios. Para una evaluación con personas, invitar estudiantes del público objetivo que no hayan desarrollado la solución, obtener consentimiento informado, participación voluntaria, opción de abandonar y permiso separado antes de grabar. No recoger nombres; usar códigos. No entregar los pedidos como compras reales: es un escenario de prototipo local.

## Protocolo

1. P00, piloto interno de comprensión del protocolo (no incluir en resultados de participantes).
2. P01 y P02, por separado y sin desarrolladores guiando controles.
3. Explicar que se evalúa el diseño y que no hay respuestas incorrectas.
4. Leer literalmente la consigna de cada tarea; moderador no señala controles ni confirma pasos.
5. Pedir pensar en voz alta; si hace falta, usar solo “¿Qué estás pensando ahora?”.
6. Registrar observación, tiempo, resultado, errores y petición de ayuda; encuesta SUS después de tareas.

## Escenarios y criterios

| Tarea | Consigna | Éxito |
|---|---|---|
| T1 | “Tienes unos minutos antes de clase. Encuentra un latte y añádelo a tu pedido.” | Latte agregado sin ayuda |
| T2 | “Decides pedir dos y quieres saber el total. Ajusta tu pedido.” | Cantidad 2 y total correcto, sin ayuda |
| T3 | Con latte y espresso en el carrito: “Retira el latte por un momento. Te das cuenta de que querías conservarlo; recupéralo y confirma el pedido.” | Recupera la línea, conserva ambos artículos y confirma el total correcto |

## Instrumentos

Consentimiento, hoja de observación en `../evidencias/observacion.csv`, tareas y registro de métricas. SUS: diez reactivos estándar, escala 1–5 tras completar tareas; calcular únicamente si se aplicó íntegramente. Anotar tipo de dispositivo, viewport y incidencias sin identificar personas.

## Métricas y análisis

- Tasa de éxito = tareas completadas sin ayuda / tareas intentadas.
- Tiempo por tarea desde lectura hasta estado final verificable.
- Errores y ayudas por tarea, además de comentarios observables.
- Satisfacción: SUS (0–100) solo con formulario completo; no inferir significancia estadística de una muestra pequeña.
- Triangular observación, encuesta y heurísticas; redactar hallazgo, evidencia, severidad e impacto.

## Calendario sugerido (120 minutos)

15 min preparar/piloto; 15 min por sesión (2 sesiones = 30 min); 20 min consolidar; 25 min corregir problemas; 20 min comprobación V2; 10 min documentar. Si se evalúan P02/P03 en ventana separada, ampliar en vez de acelerar.
