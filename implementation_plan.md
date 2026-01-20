# Plan de Expansión de Vistas y Navegación

Para completar la experiencia de "App de Delivery", agregaremos secciones críticas de configuración y gestión usuario.

## 1. Nuevas Vistas (Views)

Crearemos 5 nuevas pantallas en `src/vistas` con sus respectivos estilos en `src/estilos`.

### A. Gestión de Usuario

1.  **DireccionesVista (`/perfil/direcciones`)**: Lista de direcciones guardadas y botón para agregar nueva.
2.  **MetodosPagoVista (`/perfil/pagos`)**: Lista de tarjetas/métodos y opción de agregar.
3.  **AyudaVista (`/perfil/ayuda`)**: Centro de ayuda, preguntas frecuentes y contacto.

### B. Interacción

4.  **FavoritosVista (`/favoritos`)**: Lista de restaurantes/productos marcados como favoritos.
5.  **NotificacionesVista (`/notificaciones`)**: Historial de alertas y estados de pedidos.

## 2. Configuración de Rutas (`app/`)

Estructuraremos las rutas para mantener el orden.

- `app/perfil/direcciones.tsx`
- `app/perfil/pagos.tsx`
- `app/perfil/ayuda.tsx`
- `app/favoritos.tsx`
- `app/notificaciones.tsx`

## 3. Integración de Navegación

- **PerfilVista**: Actualizar la lista de opciones para incluir botones navegables a Direcciones, Pagos y Ayuda.
- **DashboardVista**: El icono de campana (Bell) navegará a `NotificacionesVista`.
- **Barra Inferior (Tabs)**: Evaluar si agregar `Favoritos` como tab o botón flotante. Por ahora, acceso desde Perfil o Dashboard.

## 4. Estilo Visual

Todas las nuevas vistas seguirán rigurosamente el **"Modern UI"**:

- Fondos claros (`#f9fafb`).
- Tarjetas blancas con `borderRadius: 24` y sombra roja difusa.
- Headers con `LinearGradient` rojo.

## Pasos de Ejecución

1.  **Crear Rutas**: Generar los archivos en `app/`.
2.  **Crear Estilos**: Generar archivos `.ts` en `src/estilos`.
3.  **Implementar Vistas**: Codificar la lógica visual y navegación en `src/vistas`.
4.  **Conectar**: Modificar `PerfilVista` y `DashboardVista` para habilitar los enlaces.
