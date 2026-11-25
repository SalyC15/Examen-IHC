# Revisión de cumplimiento de la prueba integradora

Esta matriz contrasta el repositorio con las nueve filas de la rúbrica universal de 2,00 puntos del documento de instrucciones. Los estados distinguen evidencia implementada de evidencia simulada; una simulación nunca se presenta como sesión observada.

| Criterio | Valor | Evidencia en el repositorio | Estado |
|---|---:|---|---|
| 1. Análisis de experiencia de usuario | 0,15 | [Análisis UX](analisis-ux.md): persona hipotética, 10 touchpoints, 2 momentos de verdad, curva emocional y matriz Nielsen/Gestalt | Documentado; hipótesis identificadas como tales |
| 2. Requisitos y arquitectura de información | 0,15 | [Requisitos](requisitos.md), [sitemap](sitemap.md), [user flow](user-flow.md), [wireframes](../prototipos/wireframes.md), [trazabilidad](trazabilidad.md) | Completo; incluye compra, modificación, cancelación y recuperación |
| 3. Prototipado e interacción | 0,15 | Tres wireframes; V1/V2; tareas con estados iniciales, tiempos meta y recuperación de errores | Completo como prototipo y especificación |
| 4. Arquitectura e implementación | 0,35 | [Arquitectura](arquitectura.md), `src/`, `assets/menu/`, `localStorage`, responsive, accesibilidad y pruebas automatizadas | Implementado; 17 pruebas incluidas |
| 5. Planificación y pilotaje | 0,15 | [Plan](../evaluacion/plan.md), [tareas](../evaluacion/tareas.md), [consentimiento](../evaluacion/consentimiento.md), [SUS](../evaluacion/sus.md), [piloto P00](../evaluacion/piloto.md) | Instrumentos listos; P00 está documentado como simulación de escritorio |
| 6. Evaluación heurística y accesibilidad | 0,25 | [Heurísticas](../evaluacion/heuristicas.md), [recorrido T2/T3](../evaluacion/recorrido-cognitivo.md), [checklist y ratios](../evaluacion/accesibilidad.md) | Documentado: 10 heurísticas, 5 hallazgos con severidad y comprobaciones técnicas |
| 7. Pruebas con usuarios y métricas | 0,25 | [Resultados](../evaluacion/resultados.csv), [observaciones](../evidencias/observacion.csv), [métricas](../evaluacion/metricas.md) | **Simulado**: P01/P02 son perfiles ficticios, no participantes reales |
| 8. Hallazgos, correcciones y validación | 0,35 | [Hallazgos](../evaluacion/hallazgos.md), [backlog](../evaluacion/backlog.md), [validación V2](../evaluacion/validacion-v2.md), capturas en `evidencias/` | Correcciones técnicas comparadas; métricas de usuario siguen siendo sintéticas |
| 9. GitHub y colaboración | 0,20 | README con aportes; commits por integrante en el historial; remoto configurado | Historial disponible; las revisiones formales de PR no se evidencian en estos archivos |

## Condición sobre datos de participantes

El PDF de instrucciones indica que no se aceptan resultados simulados o inventados como pruebas con usuarios. En una indicación posterior comunicada por el equipo, la persona estudiante informó que el docente autorizó usar simulación. Por eso los archivos de evaluación mantienen la etiqueta `SIMULACION` y aclaran que P01/P02 son ficticios; no se fabricaron testimonios ni se describen como sesiones reales.

Si se evalúa literalmente solo con el PDF adjunto, el criterio 7 queda pendiente hasta ejecutar P00 y sesiones P01/P02 reales según consentimiento, actualizar resultados/observaciones y recalcular las métricas. Si se aplica la autorización docente posterior referida por el equipo, la simulación transparente es la evidencia presentada. El repositorio no puede verificar por sí mismo esa instrucción externa.

## Límites de la evidencia

- La curva emocional y la persona son artefactos de diseño hipotéticos, no investigación primaria.
- Las capturas V1/V2 comprueban estados visibles del prototipo, no tareas realizadas por participantes. Son anteriores a la incorporación de las fotos locales.
- La inspección heurística y las pruebas automatizadas son evidencia técnica; no sustituyen la percepción de usuarios.
- El historial muestra commits de integrantes; el repositorio no contiene evidencia de revisiones formales de Pull Request.
