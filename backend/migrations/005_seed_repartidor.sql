-- Migration: Seed Repartidor User
-- Created at: 2026-01-26

-- 1. Insert User with Role 'repartidor'
INSERT INTO usuarios (nombre, email, password, rol, telefono, avatar, estado)
VALUES ('Repartidor Demo', 'repartidor@speedy.com', 'demo123', 'repartidor', '555-0100', 'https://i.pravatar.cc/150?img=60', 'activo');

-- 2. Get the ID of the inserted user (Manual step in SQL script usually requires variables or subqueries)
-- We will assume auto-increment gives us a new ID. For safety in a script, we use a subquery.

INSERT INTO repartidores (usuario_id, nombre, telefono, dni, tipo_vehiculo, modelo_vehiculo, estado, latitud_actual, longitud_actual)
SELECT id, 'Repartidor Demo', '555-0100', 'DNI123456', 'moto', 'Honda Cargo 150', 'disponible', -17.393835, -66.156946
FROM usuarios WHERE email = 'repartidor@speedy.com' LIMIT 1;
