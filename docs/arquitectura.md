# Arquitectura de software

## Decisión

Aplicación estática modular en JavaScript nativo. Para un catálogo pequeño y un prototipo evaluable, separar módulos mantiene responsabilidades visibles y elimina una cadena de compilación. Si el catálogo o el equipo crecieran, se podría migrar a un framework conservando las interfaces descritas.

```text
Presentación: index.html + styles.css
       ↓ eventos / renderizado
Aplicación: src/app.js (búsqueda, carrito, confirmación)
       ↓ lee catálogo                  ↓ guarda estado
Dominio: src/products.js      Infraestructura: localStorage
```

## Responsabilidades

- **Presentación:** HTML semántico, tarjetas, filtros, panel y diálogos accesibles; CSS adaptable y estados de foco.
- **Aplicación:** estado de vista, eventos, normalización de búsqueda, renderizado y casos de uso.
- **Dominio:** datos de producto y categorías. Cantidades deben ser enteros positivos.
- **Infraestructura:** serialización del carrito y del último pedido bajo `cafeu-v2-state` en localStorage.

## Persistencia y fallos

El almacenamiento local es una conveniencia del prototipo; puede borrarse, no sincroniza dispositivos ni transmite pedidos. `readState` tolera JSON inválido y retorna estado vacío. Una futura integración real debe agregar API, inventario, validación de precio del servidor y manejo explícito de fallos de red.

## Decisiones de interacción

- Búsqueda normalizada con descomposición Unicode para ignorar acentos y capitalización.
- Total calculado desde el catálogo, no desde el texto renderizado.
- Confirmación vacía impedida; el resumen explicita el pago en caja.
- Retorno de foco al cerrar paneles, Escape, bloqueo básico de tabulación y `inert` para contenido modal oculto.
- No se recogen datos personales ni se procesa pago.
