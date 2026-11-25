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
   └───────────────────────────────────────────────────────────┘
   ↓
[Confirmar pedido]
   ↓
[Resumen con identificador]
   ├── [Volver al menú]
   └── [Deshacer pedido] → [Carrito restaurado]
```

Estado inicial de tareas: catálogo cargado y carrito vacío para T1; latte agregado para T2; latte y otro producto agregados para T3. Reiniciar `localStorage` entre participantes para evitar arrastre de estado.
