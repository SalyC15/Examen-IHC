# User flow de compra, modificación y recuperación

```text
[Inicio]
   ↓
[Explorar menú] ←→ [Filtrar categoría / buscar]
   ↓ elegir producto
[Añadir] → [Aviso + contador actualizado]
   ↓ abrir pedido
[Revisar líneas y total]
   ├── [Ajustar cantidad] → [Cantidad y total actualizados] ──┐
   ├── [Quitar línea] → [Línea retirada y total actualizado] ──┤
   ├── [Cancelar pedido] → [Carrito vacío] → [Deshacer cancelación] ─┤
   └───────────────────────────────────────────────────────────┘
   ↓
[Confirmar pedido]
   ↓
[Resumen con identificador]
   ├── [Volver al menú]
   └── [Deshacer pedido] → [Carrito restaurado]
```

La cancelación completa solo aparece cuando hay productos. Tras cancelarla, el panel ofrece “Deshacer” para restaurar las cantidades anteriores mientras siga abierto.

Estado inicial de tareas: catálogo cargado y carrito vacío para T1; latte agregado para T2; latte y otro producto agregados para T3. Reiniciar `localStorage` entre participantes para evitar arrastre de estado.
