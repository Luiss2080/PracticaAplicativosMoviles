# Implementación de App de Delivery (Estilo PedidosYa)

Se ha transformado la aplicación para incluir un flujo de navegación completo típico de una app de delivery.

## Nuevas Funcionalidades

### 1. Navegación Principal (Tabs)

- **Inicio**: Dashboard renovado con categorías (Hamburguesas, Pizza, etc.) y restaurantes recomendados.
- **Explorar**: Búsqueda de comida y restaurantes.
- **Pedidos**: [NUEVO] Historial de pedidos y estado actual.
- **Perfil**: Configuración de usuario.

### 2. Flujos de Usuario Implementados

- **Restaurantes**: Visualización de perfil de restaurante y menú (`src/vistas/RestauranteVista.tsx`).
- **Productos**: Detalle de producto con selector de cantidad y botón de agregar (`src/vistas/ProductoVista.tsx`).
- **Carrito**: Resumen de compra, cálculo de totales y procesar pago (`src/vistas/CarritoVista.tsx`).
- **Seguimiento**: Mapa de rastreo en tiempo real del pedido en camino (`src/vistas/SeguimientoVista.tsx`).

## Archivos Creados/Modificados

### Vistas (`src/vistas`)

- `PedidosVista.tsx`
- `RestauranteVista.tsx`
- `ProductoVista.tsx`
- `CarritoVista.tsx`
- `SeguimientoVista.tsx`
- `DashboardVista.tsx` (Actualizado con nuevos accesos)
- `ExplorarVista.tsx` (Actualizado para contexto de comida)

### Estilos (`src/estilos`)

- `PedidosEstilos.ts`
- `RestauranteEstilos.ts`
- `ProductoEstilos.ts`
- `CarritoEstilos.ts`
- `SeguimientoEstilos.ts`

### Rutas (`app/`)

- `app/(tabs)/pedidos.tsx`
- `app/restaurante/[id].tsx`
- `app/producto/[id].tsx`
- `app/carrito.tsx`
- `app/seguimiento/[id].tsx`
- `app/(tabs)/_layout.tsx` (Agregado tab de Pedidos)

## Próximos Pasos

- Integrar con una API real o base de datos.
- Implementar el mapa real en la vista de seguimiento (actualmente es un placeholder).
- Mejorar la lógica de estado global para el carrito (actualmente visual).
