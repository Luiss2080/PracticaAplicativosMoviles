# Plan de Modernización Visual y UX

Objetivo: Refinar la apariencia para que sea "moderna" y mejorar la intuitividad del usuario mediante feedback háptico y visual.

## 1. Mejoras de Estilo (Modern UI)

### Login (`src/estilos/LoginEstilos.ts`, `src/vistas/LoginVista.tsx`)

- **Campos de Entrada**: Añadir feedback visual en focus (borde rojo más intenso, sombra).
- **Botón Ingresar**: Añadir sombra suave (elevation/shadowColor) y efecto al presionar.
- **Iconografía**: Asegurar que los iconos tengan buen contraste.

### Dashboard (`src/estilos/DashboardEstilos.ts`)

- **Tarjetas**: Aumentar `borderRadius` a 16 o 20. Usar sombras difusas (`shadowOpacity: 0.1`, `shadowRadius: 10`).
- **Header**: Mejorar la tipografía del saludo.
- **Categorías**: Hacerlas más limpias, quizás con un fondo sutilmente degradado o blanco puro con sombra.

### Producto (`src/vistas/ProductoVista.tsx`, `src/estilos/ProductoEstilos.ts`)

- **Interacción**: Añadir `Simple Animation` al presionar botones de cantidad.
- **Feedback**: Mostrar un mensaje "Toast" o alerta personalizada al agregar al carrito.
- **Imagen**: Usar un gradiente en la parte inferior de la imagen para que el texto sea siempre legible si se superpone.

## 2. Mejoras de Experiencia (UX)

### Feedback Háptico (`expo-haptics`)

Integrar `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` en:

- Botones de cantidad (+/-).
- Botón "Agregar al Carrito".
- Botón "Ingresar" en Login.
- Items del menú de navegación.

### Navegación Intuitiva

- **Dashboard**: Añadir título claro de sección "Categorías".
- **Carrito**: Añadir botón visible de "Seguir comprando" si está vacío (estado vacío).

## Pasos de Ejecución

1.  **Refinar Estilos**: Actualizar `LoginEstilos` y `DashboardEstilos` con sombras modernas y bordes redondeados.
2.  **Integrar Haptics**: Modificar `ProductoVista`, `LoginVista`, `CarritoVista` para añadir feedback táctil.
3.  **Aniadir Feedback Visual**: Implementar cambios de opacidad (`activeOpacity`) en TouchableOpacity.
