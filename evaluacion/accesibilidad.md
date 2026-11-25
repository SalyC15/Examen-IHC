# Checklist de accesibilidad

Revisión estática previa; repetir manualmente con tecnologías de asistencia y navegador objetivo.

| Criterio | Soporte en interfaz | Estado / siguiente comprobación |
|---|---|---|
| Teclado | Enlaces y botones nativos, controles de cantidad, Escape. V2: “Deshacer” dentro del panel y con foco; el foco se conserva en +/− tras re‑renderizar | Comprobado en Chromium (V2) |
| Foco visible | `:focus-visible` #b4531f (4,79:1) y #f5c48e sobre fondos oscuros; buscador con `:focus-within` | Corregido en V2 (H-07) |
| Foco modal | Foco inicial, retorno al disparador, `inert` y ciclo Tab | Validar con lector de pantalla; ciclo de tabulación básico implementado |
| Etiquetas | Label accesible en búsqueda, nombre en icon buttons | Revisar árbol accesible |
| Estado | `aria-live` en aviso, total y resultados; el nombre accesible del carrito informa el conteo | Confirmar que lector anuncia sin repetición excesiva |
| Semántica | `header`, `nav`, `main`, `section`, `article`, encabezados | Inspección manual |
| Contraste | Medido con fórmula WCAG (tabla abajo) | Corregido en V2 (H-05) |
| Reflow | CSS Mobile First (`min-width: 601px` y `901px`) | Sin desbordamiento horizontal a 375, 768 y 1280 px |
| Movimiento | `prefers-reduced-motion` | Verificar preferencia en sistema operativo |
| Errores | Mensaje en búsqueda sin resultados con acción | Probar teclado y anuncios |

| Área táctil | +/− de 40×40 px; Añadir/Quitar con 40 px de alto | Corregido en V2 (H-06) |
| Mensajes de error | Búsqueda vacía con acción; aviso si el estado guardado es ilegible | Corregido en V2 (H-08) |

## Contraste medido (WCAG 2.x)

| Elemento | V1 | Ratio V1 | V2 | Ratio V2 | Requisito |
|---|---|---:|---|---:|---|
| Texto atenuado sobre papel | #777d74 / #fbfaf6 | 4,05 | #5f665d | 5,67 | 4,5 |
| Eyebrow sobre papel | #a57954 / #fbfaf6 | 3,68 | #8a5f3c | 5,32 | 4,5 |
| Eyebrow sobre sección “Nosotros” | #a57954 / #f0eee5 | 3,31 | #8a5f3c | 4,78 | 4,5 |
| Botones de categoría | #747971 / #fbfaf6 | 4,26 | #5f665d | 5,67 | 4,5 |
| Contador del carrito | #fff / #df8e57 | 2,58 | #fff / #b4531f | 5,00 | 4,5 |
| Párrafo “Nosotros” | #6e766d / #f0eee5 | 4,04 | #596158 | 5,52 | 4,5 |
| Anillo de foco | #e9955e / #fbfaf6 | 2,25 | #b4531f | 4,79 | 3 (no textual) |

No se declara conformidad WCAG sin medición de contraste y prueba asistiva.
