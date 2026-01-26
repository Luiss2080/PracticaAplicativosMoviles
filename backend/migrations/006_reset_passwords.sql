-- HARD RESET SCRIPT
-- WARNING: This deletes ALL users and drivers to fix credential issues once and for all.

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE usuarios;
TRUNCATE TABLE repartidores;
SET FOREIGN_KEY_CHECKS=1;

-- 1. Create Client
INSERT INTO usuarios (id, nombre, email, password, rol, avatar, telefono) 
VALUES (
    1,
    'Cliente', 
    'cliente@gmail.com', 
    '1234', 
    'cliente',
    'https://randomuser.me/api/portraits/men/1.jpg',
    '70012345'
);

-- 2. Create Driver
INSERT INTO usuarios (id, nombre, email, password, rol, avatar, telefono) 
VALUES (
    2,
    'Repartidor', 
    'moto@gmail.com', 
    '1234', 
    'repartidor',
    'https://randomuser.me/api/portraits/men/2.jpg',
    '70054321'
);

-- 3. Link Driver Profile
INSERT INTO repartidores (usuario_id, nombre, modelo_vehiculo, placa_vehiculo, estado, tipo_vehiculo)
VALUES (
    2, 
    'Juan Moto', 
    'Honda 150', 
    '3344-XYZ', 
    'disponible',
    'moto'
);
