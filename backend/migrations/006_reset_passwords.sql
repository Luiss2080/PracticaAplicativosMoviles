-- Migration: Reset Credentials for Demo Purposes
-- Created to ensure valid login for Client and Driver roles

-- 1. Ensure clean slate for demo users (delete by email to avoid unique conflicts)
DELETE FROM usuarios WHERE email IN ('cliente@speedy.com', 'repartidor@speedy.com', 'juan@speedy.com');
DELETE FROM usuarios WHERE nombre IN ('SpeedyCliente', 'SpeedyRepartidor');
DELETE FROM repartidores WHERE nombre = 'Juan Repartidor'; -- Cleanup associated delivery profile

-- 2. Insert Client User (Plain text password as per server.js logic)
INSERT INTO usuarios (nombre, email, password, rol, avatar, telefono) 
VALUES (
    'SpeedyCliente', 
    'cliente@speedy.com', 
    'demo123', 
    'cliente',
    'https://randomuser.me/api/portraits/men/32.jpg',
    '555-0101'
);

-- 3. Insert Driver User
INSERT INTO usuarios (nombre, email, password, rol, avatar, telefono) 
VALUES (
    'SpeedyRepartidor', 
    'repartidor@speedy.com', 
    'demo123', 
    'repartidor',
    'https://randomuser.me/api/portraits/women/44.jpg',
    '555-0102'
);

-- 4. Create Driver Profile linked to the new Driver User
-- We need the ID of the inserted user. In a script, we can use LAST_INSERT_ID() immediately if single insert, 
-- but since we did two, let's use a subquery to be safe.

INSERT INTO repartidores (usuario_id, nombre, vehiculo, placa, estado, latitud, longitud)
SELECT 
    id, 
    'Juan Repartidor', 
    'Moto Honda 150cc', 
    'ABC-1234', 
    'disponible', 
    -17.7833, 
    -63.1821
FROM usuarios 
WHERE nombre = 'SpeedyRepartidor';

-- 5. Output confirmation (Optional comment)
-- Users created: SpeedyCliente / demo123 AND SpeedyRepartidor / demo123
