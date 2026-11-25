# Validación V2

## Cambio a verificar

V2 añade recuperación de una línea eliminada mediante el aviso y anuncios del total a tecnologías de asistencia. Se modeló un contraste V1/V2 con dos perfiles sintéticos por indicación del equipo. Las cifras que siguen son simuladas: no hay sesiones ni personas reales y no prueban una mejora causal.

## Comparación

| Medida | V1 | V2 | Fuente |
|---|---|---|---|
| Éxito conjunto | 4/6 (66,7 %) | 6/6 (100 %) | Escenario sintético, 2 perfiles |
| Éxito T3 | 0/2 | 2/2 | Escenario sintético |
| Tiempo medio por intento | 46,8 s | 31,2 s | Tiempos asignados, no cronómetro |
| Errores supuestos | 7 | 2 | Narrativa sintética |
| SUS medio supuesto | 71,25 | 78,75 | Puntajes simulados, no cuestionarios respondidos |

## Procedimiento

Para sustituir esta simulación: ejecutar T1–T3 con participantes reales, condiciones comparables y moderación neutral; aplicar SUS completo; registrar evidencia; repetir tareas afectadas en V2. Adjuntar capturas de ambos estados con datos personales ocultos.

## Comprobaciones técnicas repetidas (V1 → V2, reales)

Estas comprobaciones sí se ejecutaron sobre la interfaz y son reproducibles; complementan, pero no reemplazan, la medición con participantes.

| Problema | Comprobación | V1 (commit `4e09297`) | V2 | Evidencia |
|---|---|---|---|---|
| H-03 Deshacer con teclado | Quitar latte con el panel abierto; ¿dónde queda el foco y es alcanzable “Deshacer”? | Foco en “Cerrar”; Deshacer fuera del ciclo de Tab; expira 2,6 s | Foco en “Deshacer” dentro del panel; no expira | Chromium 375×812 |
| H-04 Mensaje vacío contradictorio | Carrito con 1 producto: `display` de `#cart-empty` | `grid` (visible) | `none` | `evidencias/antes` vs `evidencias/despues` |
| H-05 Contraste | Ratio WCAG de 7 pares | 6 pares por debajo del mínimo | 7/7 cumplen | [accesibilidad.md](accesibilidad.md) |
| H-06 Área táctil +/− | Ancho calculado | 25 px | 40 px | `getComputedStyle` |
| H-07 Foco del buscador | Foco visible al tabular al campo | Sin contorno | Contorno 3 px | Inspección |
| H-08 Estado corrupto | `localStorage` con JSON inválido | Carrito vacío sin aviso | Aviso al iniciar | Prueba automatizada |
| Regresión | `npm test` | 5 pruebas de dominio | 14/14 (dominio + T1, T2, T3 + persistencia) | `tests/pruebas-automatizadas/` |
| Responsive | Desbordamiento horizontal a 375 / 768 / 1280 px | — | Ninguno; 2, 2 y 4 columnas | Chromium |

## Conclusión

En el escenario sintético, V1 falla la recuperación directa y V2 modela una recuperación exitosa. La inspección confirma que V2 implementa la acción y anuncia el total. La eficacia, eficiencia y satisfacción reales siguen sin comprobarse; la muestra actual es simulada y no representativa.

**Conclusión técnica:** las seis correcciones de V2 eliminan los problemas reproducibles en la interfaz (eficacia para teclado en T3, coherencia del estado, contraste y áreas táctiles). Las afirmaciones sobre eficiencia y satisfacción de usuarios requieren reemplazar los datos simulados por sesiones P01/P02 reales; la muestra de 2 personas sería descriptiva y no generalizable.
