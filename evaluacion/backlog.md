# Backlog priorizado

Prioridad = severidad (0–4, Nielsen) × impacto en las tareas T1–T3. La fuente indica si el problema proviene de la inspección heurística (HE), del recorrido cognitivo (RC), de la verificación técnica de accesibilidad (A11Y) o del escenario simulado (SIM). Los ítems SIM no sustituyen observación real.

| Prioridad | ID | Problema | Fuente | Sev. | Tarea afectada | Acción | Estado |
|---|---|---|---|---:|---|---|---|
| 1 | H-01 | La recuperación de una línea eliminada no tenía salida clara | HE 3/5, RC T3, SIM | 3 | T3 | Acción Deshacer temporal | Cerrado en V2 (commit `cae382c`, recuperación dentro del panel) |
| 2 | H-03 | “Deshacer” vivía en el aviso flotante, fuera del panel modal con foco atrapado: no alcanzable con teclado y expiraba a los 2,6 s | A11Y, RC T3 paso 2 | 3 | T3 | Zona `#cart-undo` dentro del panel, recibe el foco y no expira | **Cerrado en V2** |
| 3 | H-04 | El mensaje “Tu pedido está esperando algo rico” se mostraba junto a productos en el carrito (`display:grid` anulaba `hidden`) | HE 1/4, captura V1 | 3 | T2, T3 | Regla `[hidden]{display:none!important}` | **Cerrado en V2** |
| 4 | H-05 | Seis pares de color bajo AA (texto atenuado 4,05:1; eyebrow 3,31:1; contador 2,58:1; anillo de foco 2,25:1) | A11Y | 2 | T1–T3 | Paleta ajustada y re‑medida | **Cerrado en V2** |
| 5 | H-06 | Controles +/− de 25 px y “Quitar” sin relleno: áreas táctiles pequeñas y próximas | HE 5, RC T2 paso 2 | 2 | T2 | Botones de 40 px y enlaces con 40 px de alto | **Cerrado en V2** |
| 6 | H-07 | El buscador no mostraba foco (`outline:0` anulaba `:focus-visible`) | A11Y | 2 | T1 | `.search-box:focus-within` | **Cerrado en V2** |
| 7 | H-08 | Estado guardado corrupto vaciaba el carrito sin aviso | HE 9 | 2 | — | Aviso “No pudimos recuperar tu pedido anterior” | **Cerrado en V2** |
| 8 | H-02 | Cambio del total no anunciado a lectores de pantalla | SIM, HE 1 | 2 | T2 | `aria-live` en total | Cerrado en V2 |
| 9 | H-09 | No hay información de alérgenos ni ayuda | HE 10 | 2 | — | Añadir ficha de producto | Abierto |
| 10 | H-10 | Diálogo podría interpretarse como pago en línea | HE 2 | 1 | T3 | Validar con participantes reales | Abierto |
| 11 | H-11 | El aviso flotante cubre parte del botón Confirmar en móvil durante 2,6 s | Captura V1/V2 | 1 | T3 | Desplazar aviso cuando el panel está abierto | Abierto |

Criterio de cierre: la corrección está implementada, cubierta por prueba automatizada o comprobación repetida (ver [validacion-v2.md](validacion-v2.md)) y documentada con captura en `../evidencias/`.
