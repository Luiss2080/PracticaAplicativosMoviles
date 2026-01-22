# Arquitectura del Sistema "Speedy"

Este documento explica cómo funcionan las partes de tu aplicación y cómo se conectan entre sí.

## 1. Diagrama General

```mermaid
graph TD
    User[📱 App en Celular] -->|1. Petición HTTP (Fetch)| API[🌐 API Backend (Node.js/Express)]
    API -->|2. Consulta SQL| DB[(🗄️ Base de Datos MySQL)]
    DB -->|3. Datos (Filas)| API
    API -->|4. Respuesta JSON| User
```

## 2. Los Componentes

### A. Frontend (La App)

- **Qué es**: Lo que ves en el celular (React Native / Expo).
- **Ubicación**: Carpeta `src/`, `app/`.
- **Función**: Muestra la interfaz, botones y mapas. **No guarda datos por sí misma** permanentemente.
- **Conexión**: Usa el archivo `src/servicios/BaseDeDatos.ts` para "llamar" al backend.

### B. Backend (La API)

- **Qué es**: Un servidor web simple (Node.js + Express).
- **Ubicación**: Carpeta `backend/`.
- **Archivo Principal**: `backend/server.js`.
- **Función**: Es el "intermediario". Recibe pedidos de la app ("dame las hamburguesas"), busca en la base de datos, y responde.
- **Por qué separar**: Por seguridad y centralización. El celular no debe conectarse directo a la base de datos MySQL por riesgo de seguridad.

### C. Base de Datos (MySQL)

- **Qué es**: Donde vive la información real (Tablas: usuarios, productos, etc.).
- **Ubicación**: Tu servidor MySQL (Laragon/XAMPP).
- **Acceso**: Solo el Backend tiene la contraseña para entrar aquí.

---

## 3. Solución a "Fallas en la API" / "Network request failed"

El error que ves (`Network request failed`) sucede porque **tu celular no encuentra tu computadora** en la red.

### El Problema de la IP

Tu computadora tiene una "Dirección IP" en tu WiFi (ej: `192.168.1.15`).
A veces, herramientas como Docker o WSL crean IPs falsas (ej: `172.25.1.150`). Si Expo toma la IP falsa, tu celular intenta conectarse a un lugar que no existe.

### Pasos para arreglarlo:

1.  **Abre una terminal** (CMD o PowerShell) en Windows.
2.  Ejecuta: `ipconfig`
3.  Busca tu adaptador de **Wi-Fi** y la **Dirección IPv4**. (Debe parecerse a `192.168.x.x`).
4.  Ve al archivo `src/servicios/BaseDeDatos.ts`.
5.  Cambia la línea `const MANUAL_IP = null;` por tu IP real:
    ```typescript
    const MANUAL_IP = "192.168.1.XX"; // Tu IP
    ```
6.  Guarda y recarga la app (shake > reload).

¡Esto forzará a la app a buscar tu PC en la dirección correcta!
