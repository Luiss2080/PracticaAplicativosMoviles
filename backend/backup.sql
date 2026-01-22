-- Script de Configuración MySQL para 'Speedy' (Versión Completa)
-- Módulos: Usuarios, Restaurantes, Productos, Extras/Opciones, Pedidos, Repartidores, Direcciones, Pagos, Favoritos, Notificaciones.

CREATE DATABASE IF NOT EXISTS Speedy;
USE Speedy;

-- ==========================================
-- 1. TABLAS PRINCIPALES
-- ==========================================

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  avatar VARCHAR(255) DEFAULT 'https://i.pravatar.cc/150?img=12',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  icono VARCHAR(50) NOT NULL, -- Nombre de icono (FontAwesome/Material)
  color VARCHAR(20) NOT NULL, -- Color de fondo en UI
  imagen_cover VARCHAR(255)   -- Imagen opcional para banner
);

CREATE TABLE IF NOT EXISTS restaurantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen TEXT,
  calificacion DECIMAL(3,1) DEFAULT 5.0,
  tiempo_estimado VARCHAR(50) DEFAULT '30-45 min',
  categoria_id INT,
  envio DECIMAL(10,2) DEFAULT 0.00,
  direccion_local VARCHAR(255),
  abierto BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurante_id INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  imagen TEXT,
  calorias INT, -- Info nutricional
  tiempo_preparacion VARCHAR(50), 
  disponible BOOLEAN DEFAULT TRUE,
  categoria_producto VARCHAR(100), -- Ej: "Hamburguesas", "Bebidas" (dentro del restaurante)
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
);

-- ==========================================
-- 2. SISTEMA DE EXTRAS / OPCIONES (Formularios Dinámicos)
-- ==========================================

-- Ej: "Elige tu Tamaño", "Elige tus Salsas"
CREATE TABLE IF NOT EXISTS grupos_opciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL, -- Título de la sección
  tipo_seleccion VARCHAR(20) DEFAULT 'checkbox', -- 'checkbox' (multiple), 'radio' (único), 'cantidad' (contador)
  requerido BOOLEAN DEFAULT FALSE,
  minimo INT DEFAULT 0,
  maximo INT DEFAULT 10,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Ej: "Mediana", "Grande", "Mayonesa"
CREATE TABLE IF NOT EXISTS opciones_producto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grupo_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  precio_extra DECIMAL(10,2) DEFAULT 0.00,
  max_cantidad INT DEFAULT 1, -- Cuántas veces se puede pedir este mismo extra
  FOREIGN KEY (grupo_id) REFERENCES grupos_opciones(id) ON DELETE CASCADE
);

-- ==========================================
-- 3. PERFIL DE USUARIO 
-- ==========================================

CREATE TABLE IF NOT EXISTS direcciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(100) NOT NULL, -- "Casa", "Trabajo"
  direccion TEXT NOT NULL,
  referencia TEXT,
  icono VARCHAR(50) DEFAULT 'map-marker',
  latitud DECIMAL(10,8),
  longitud DECIMAL(10,8),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS metodos_pago (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo VARCHAR(50) NOT NULL, -- 'tarjeta', 'efectivo', 'yape'
  numero_enmascarado VARCHAR(20), -- **** **** **** 1234
  titular VARCHAR(100),
  icono VARCHAR(50),
  es_predeterminado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favoritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
  UNIQUE(usuario_id, producto_id) -- Evitar duplicados
);

CREATE TABLE IF NOT EXISTS notificaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo VARCHAR(50) DEFAULT 'info', -- 'pedido', 'promo', 'sistema'
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==========================================
-- 4. GESTIÓN DE PEDIDOS Y LOGÍSTICA
-- ==========================================

CREATE TABLE IF NOT EXISTS repartidores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  vehiculo_placa VARCHAR(20),
  foto VARCHAR(255),
  latitud_actual DECIMAL(10,8),
  longitud_actual DECIMAL(10,8),
  estado VARCHAR(50) DEFAULT 'disponible' -- 'ocupado', 'desconectado'
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  repartidor_id INT, -- Se asigna luego
  direccion_id INT, -- Dónde se entrega
  metodo_pago_id INT, -- Con qué se pagó
  restaurante VARCHAR(255), -- Nombre para ref rápida
  total DECIMAL(10,2) NOT NULL,
  costo_envio DECIMAL(10,2) DEFAULT 0.00,
  estado VARCHAR(50) DEFAULT 'Pendiente', -- Pendiente, Preparando, EnCamino, Entregado, Cancelado
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notas_cliente TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (repartidor_id) REFERENCES repartidores(id) ON DELETE SET NULL,
  FOREIGN KEY (direccion_id) REFERENCES direcciones(id) ON DELETE SET NULL,
  FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS detalle_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  extras_seleccionados TEXT, -- JSON o Texto plano con la selección del usuario: "Queso, Doble Carne"
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- ==========================================
-- 5. SEMILLA DE DATOS (SEEDERS)
-- ==========================================

-- Usuarios
INSERT INTO usuarios (nombre, email, password, telefono, avatar) VALUES 
('Usuario Demo', 'demo@speedy.com', 'demo123', '999888777', 'https://i.pravatar.cc/150?u=1');

-- Categorías
INSERT INTO categorias (nombre, icono, color) VALUES 
('Hamburguesas', 'hamburger', '#ffedd5'), 
('Pizza', 'pizza-slice', '#fee2e2'),
('Sushi', 'fish', '#dcfce7'),
('Postres', 'ice-cream', '#f3e8ff'),
('Bebidas', 'glass-cheers', '#e0f2fe'),
('Pollo', 'drumstick-bite', '#fef3c7');

-- Restaurantes
INSERT INTO restaurantes (nombre, descripcion, imagen, calificacion, tiempo_estimado, categoria_id, envio) VALUES
('Burger King', 'A la parrilla sabe mejor', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.5, '30-40 min', 1, 5.00),
('McDonalds', 'Me encanta', 'https://images.unsplash.com/photo-1550547660-d9450f859349', 4.3, '15-20 min', 1, 3.50),
('Pizza Hut', 'Hacemoslo mejor', 'https://images.unsplash.com/photo-1590947132387-155cc02f3212', 4.2, '40-50 min', 2, 6.00),
('Edo Sushi Bar', 'Pasión nikkei', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c', 4.8, '50-60 min', 3, 8.00),
('Starbucks', 'Café para el alma', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 4.6, '15 min', 5, 2.00);

-- Productos & EXTRAS
-- ---------------
-- Burger King (ID 1)
INSERT INTO productos (restaurante_id, nombre, descripcion, precio, imagen, categoria_producto, calorias) VALUES
(1, 'Whopper Doble', 'Doble carne a la parrilla, vegetales frescos y mayonesa.', 18.50, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', 'Hamburguesas', 900),
(1, 'Papas Supremas', 'Papas fritas con queso cheddar y tocino.', 12.00, 'https://images.unsplash.com/photo-1573080496987-a199f8cd4054', 'Acompañamientos', 600);

-- Extras para Whopper Doble (Prod ID 1)
INSERT INTO grupos_opciones (producto_id, nombre, tipo_seleccion) VALUES (1, 'Adicionales', 'checkbox');
SET @grp_id = LAST_INSERT_ID();
INSERT INTO opciones_producto (grupo_id, nombre, precio_extra) VALUES 
(@grp_id, 'Queso Extra', 1.50),
(@grp_id, 'Tocino', 2.00),
(@grp_id, 'Huevo Frito', 1.00);

INSERT INTO grupos_opciones (producto_id, nombre, tipo_seleccion, requerido) VALUES (1, 'Bebida', 'radio', TRUE);
SET @grp_id = LAST_INSERT_ID();
INSERT INTO opciones_producto (grupo_id, nombre, precio_extra) VALUES 
(@grp_id, 'Coca Cola', 0.00),
(@grp_id, 'Inka Cola', 0.00),
(@grp_id, 'Agua', 0.00);

-- ---------------
-- Pizza Hut (ID 3)
INSERT INTO productos (restaurante_id, nombre, descripcion, precio, imagen, categoria_producto) VALUES
(3, 'Pizza Pepperoni Familiar', 'Masa clásica con abundante pepperoni americano.', 45.00, 'https://images.unsplash.com/photo-1628840042765-356cda07504e', 'Pizzas');

-- Extras para Pizza (Prod ID 3)
INSERT INTO grupos_opciones (producto_id, nombre, tipo_seleccion) VALUES (3, 'Borde', 'radio');
SET @grp_id = LAST_INSERT_ID();
INSERT INTO opciones_producto (grupo_id, nombre, precio_extra) VALUES 
(@grp_id, 'Masa Tradicional', 0.00),
(@grp_id, 'Borde de Queso', 5.00),
(@grp_id, 'Borde Hot Dog', 6.00);

-- Direcciones
INSERT INTO direcciones (usuario_id, titulo, direccion, referencia) VALUES
(1, 'Casa', 'Av. Larco 123, Miraflores', 'Edificio Blanco, Piso 4'),
(1, 'Oficina', 'Centro Empresarial Real, San Isidro', 'Torre Azul');

-- Métodos de Pago
INSERT INTO metodos_pago (usuario_id, tipo, numero_enmascarado, titular, es_predeterminado) VALUES
(1, 'Visa', '**** **** **** 4242', 'Usuario Demo', TRUE),
(1, 'Mastercard', '**** **** **** 5555', 'Usuario Demo', FALSE);

-- Favoritos
INSERT INTO favoritos (usuario_id, producto_id) VALUES (1, 1), (1, 3);

-- Notificaciones
INSERT INTO notificaciones (usuario_id, titulo, mensaje, tipo) VALUES
(1, '¡Bienvenido!', 'Gracias por unirte a Speedy. Disfruta tu primer pedido con envio gratis.', 'sistema'),
(1, 'Tu pedido está en camino', 'El repartidor ha recogido tu orden de Burger King.', 'pedido');

-- Repartidores
INSERT INTO repartidores (nombre, vehiculo_placa, estado, foto) VALUES
('Juan Pérez', 'NG-2023', 'disponible', 'https://i.pravatar.cc/150?u=50'),
('Maria Lopez', 'Moto-88', 'ocupado', 'https://i.pravatar.cc/150?u=60');
