# Checklist de accesibilidad

Revisión estática previa; repetir manualmente con tecnologías de asistencia y navegador objetivo.

| Criterio | Soporte en interfaz | Estado / siguiente comprobación |
|---|---|---|
| Teclado | Enlaces y botones nativos, controles de cantidad, Escape | Verificar orden completo con Tab/Shift+Tab |
| Foco visible | `:focus-visible` de alto contraste | Comprobar en Chrome y Firefox |
| Foco modal | Foco inicial, retorno al disparador, `inert` y ciclo Tab | Validar con lector de pantalla; ciclo de tabulación básico implementado |
| Etiquetas | Label accesible en búsqueda, nombre en icon buttons | Revisar árbol accesible |
| Estado | `aria-live` en aviso, conteo y resultados | Confirmar que lector anuncia sin repetición excesiva |
| Semántica | `header`, `nav`, `main`, `section`, `article`, encabezados | Inspección manual |
| Contraste | Paleta oscura sobre claro en texto principal | Medir todos los pares y estados, en especial texto pequeño |
| Reflow | CSS para móvil y columnas fluidas | Revisar a 320 px y zoom 200–400 % |
| Movimiento | `prefers-reduced-motion` | Verificar preferencia en sistema operativo |
| Errores | Mensaje en búsqueda sin resultados con acción | Probar teclado y anuncios |

No se declara conformidad WCAG sin medición de contraste y prueba asistiva.
