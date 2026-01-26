-- Migration: Add Roles and Auth Logic
-- Created at: 2026-01-26

-- 1. Add 'rol' column to 'usuarios' table
ALTER TABLE usuarios ADD COLUMN rol ENUM('cliente', 'repartidor', 'admin', 'restaurante') DEFAULT 'cliente' AFTER email;

-- 2. Add 'usuario_id' to 'repartidores' table to link with auth
ALTER TABLE repartidores ADD COLUMN usuario_id INT UNIQUE AFTER id;

-- 3. Add FK constraint (assuming usuarios exists)
ALTER TABLE repartidores ADD CONSTRAINT fk_repartidores_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE;

-- 4. Create a default admin/repartidor if needed (optional for now, can be done in seeds)
-- Checking if we need to migrate existing data:
-- If there are existing repartidores, we might need to create users for them manually or via script.
