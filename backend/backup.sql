-- Script de Configuración MySQL para 'Speedy' (Versión "Ultimate" Future-Proof)
-- Módulos: Core, Logística, Marketing, Fidelización, Soporte, Analítica, Social.

CREATE DATABASE IF NOT EXISTS Speedy;
USE Speedy;

-- ==========================================
-- 1. GESTIÓN DE USUARIOS Y PERFILES (Personalización Avanzada)
-- ==========================================

CREATE TABLE IF NOT EXISTS niveles_fidelidad (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL, -- "Bronce", "Plata", "Oro", "Diamante"
  puntos_minimos INT NOT NULL,
  beneficios_json JSON -- Ej: {"envio_gratis": true, "descuento_base": 0.05}
);

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Credenciales
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  
  -- Perfil Básico
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255),
  telefono VARCHAR(20),
  avatar VARCHAR(255) DEFAULT 'https://i.pravatar.cc/150?img=12',
  
  -- Personalización & Datos Demográficos
  fecha_nacimiento DATE,
  genero ENUM('M', 'F', 'Otro', 'Prefiero no decir'),
  bio TEXT, -- Descripción corta del usuario
  
  -- Preferencias (JSON para flexibilidad futura)
  preferencias_json JSON, -- Ej: {"notificaciones_push": true, "newsletter": false, "modo_oscuro": true, "alergias": ["mani", "lactosa"]}
  
  -- Fidelización
  puntos_actuales INT DEFAULT 0,
  nivel_id INT DEFAULT 1,
  
  -- Metadatos
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultimo_login TIMESTAMP,
  estado ENUM('activo', 'suspendido', 'banned') DEFAULT 'activo',
  
  FOREIGN KEY (nivel_id) REFERENCES niveles_fidelidad(id)
);

-- Historial de Puntos (Ganados/Gastados)
CREATE TABLE IF NOT EXISTS historial_puntos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cantidad INT NOT NULL, -- Positivo (ganó) o Negativo (gastó)
  concepto VARCHAR(255), -- "Compra #123", "Regalo de Cumpleaños"
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==========================================
-- 2. CATÁLOGO Y COMERCIOS
-- ==========================================

CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE, -- Para URLs amigables (SEO)
  icono VARCHAR(50) NOT NULL, 
  color VARCHAR(20) NOT NULL,
  imagen_cover VARCHAR(255),
  orden_visual INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS restaurantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Info Básica
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_logo VARCHAR(255),
  imagen_portada VARCHAR(255),
  
  -- Operativa
  calificacion DECIMAL(3,1) DEFAULT 5.0,
  tiempo_estimado_min INT DEFAULT 30,
  tiempo_estimado_max INT DEFAULT 45,
  costo_envio_base DECIMAL(10,2) DEFAULT 0.00,
  pedido_minimo DECIMAL(10,2) DEFAULT 0.00,
  
  -- Clasificación
  categoria_id INT,
  etiquetas_json JSON, -- ["Vegano", "Pet Friendly", "24 horas"]
  
  -- Ubicación & Contacto
  direccion_texto VARCHAR(255),
  latitud DECIMAL(10,8),
  longitud DECIMAL(10,8),
  telefono_contacto VARCHAR(20),
  
  -- Estado
  estado ENUM('abierto', 'cerrado', 'fuera_de_servicio') DEFAULT 'abierto',
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Horarios de Atención (Complejo: L-D con múltiples turnos)
CREATE TABLE IF NOT EXISTS horarios_restaurante (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurante_id INT NOT NULL,
  dia_semana TINYINT NOT NULL, -- 0=Domingo, 1=Lunes... 6=Sábado
  hora_apertura TIME NOT NULL,
  hora_cierre TIME NOT NULL,
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurante_id INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  precio_descuento DECIMAL(10,2), -- Precio oferta opcional
  imagen VARCHAR(255),
  
  -- Detalles & Atributos
  calorias INT,
  es_vegetariano BOOLEAN DEFAULT FALSE,
  es_picante BOOLEAN DEFAULT FALSE,
  es_gluten_free BOOLEAN DEFAULT FALSE,
  tiempo_preparacion_min INT, 
  
  -- Organización
  disponible BOOLEAN DEFAULT TRUE,
  categoria_interna VARCHAR(100), -- "Entradas", "Fondos"
  orden_visual INT DEFAULT 0,
  
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
);

-- ==========================================
-- 3. PERSONALIZACIÓN DE PRODUCTOS (EXTRAS)
-- ==========================================

CREATE TABLE IF NOT EXISTS grupos_opciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL, -- "Elige tu Salsa"
  tipo_seleccion ENUM('checkbox', 'radio', 'cantidad') DEFAULT 'checkbox',
  minimo_seleccion INT DEFAULT 0,
  maximo_seleccion INT DEFAULT 10,
  es_requerido BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS opciones_producto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grupo_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL, -- "Salsa BBQ"
  precio_extra DECIMAL(10,2) DEFAULT 0.00,
  estado ENUM('disponible', 'agotado') DEFAULT 'disponible',
  FOREIGN KEY (grupo_id) REFERENCES grupos_opciones(id) ON DELETE CASCADE
);

-- ==========================================
-- 4. MARKETING Y PROMOCIONES
-- ==========================================

CREATE TABLE IF NOT EXISTS cupones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE NOT NULL, -- "VERANO2026"
  descripcion VARCHAR(255),
  tipo_descuento ENUM('porcentaje', 'monto_fijo', 'envio_gratis') NOT NULL,
  valor DECIMAL(10,2) NOT NULL, -- 10% o $5.00
  
  -- Restricciones
  pedido_minimo DECIMAL(10,2) DEFAULT 0.00,
  tope_reintegro DECIMAL(10,2), -- Max descuento aplicable (para porcentajes)
  fecha_inicio DATETIME,
  fecha_expiracion DATETIME,
  limite_usos_total INT, -- Usos globales
  limite_usos_usuario INT DEFAULT 1, -- Usos por persona
  activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS cupones_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cupon_id INT NOT NULL,
  fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pedido_id INT, -- En qué pedido lo usó
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (cupon_id) REFERENCES cupones(id) ON DELETE CASCADE
);

-- ==========================================
-- 5. LOGÍSTICA Y PEDIDOS
-- ==========================================

CREATE TABLE IF NOT EXISTS direcciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(50), -- "Casa"
  calle_numero TEXT NOT NULL,
  piso_depto VARCHAR(50),
  referencia TEXT,
  ciudad VARCHAR(100),
  codigo_postal VARCHAR(20),
  latitud DECIMAL(10,8),
  longitud DECIMAL(10,8),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tarjetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  marca VARCHAR(20), -- Visa, Mastercard
  ultimos_cuatro CHAR(4),
  token_pasarela VARCHAR(255), -- Token seguro (Stripe/Culqi)
  expiracion_mes CHAR(2),
  expiracion_anio CHAR(4),
  es_billetera DEFAULT FALSE, -- Apple Pay / Google Pay
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS repartidores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Datos Personales
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  dni VARCHAR(20) UNIQUE,
  foto_perfil VARCHAR(255),
  
  -- Vehículo
  tipo_vehiculo ENUM('moto', 'bicicleta', 'auto') DEFAULT 'moto',
  placa_vehiculo VARCHAR(20),
  modelo_vehiculo VARCHAR(100),
  
  -- Estado
  estado ENUM('disponible', 'ocupado', 'fuera_servicio') DEFAULT 'fuera_servicio',
  latitud_actual DECIMAL(10,8),
  longitud_actual DECIMAL(10,8),
  ultima_actualizacion TIMESTAMP,
  
  calificacion_promedio DECIMAL(3,1) DEFAULT 5.0
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_seguimiento VARCHAR(20) UNIQUE, -- #ORD-12345
  
  -- Actores
  usuario_id INT NOT NULL,
  restaurante_id INT NOT NULL,
  repartidor_id INT,
  direccion_entrega_id INT,
  
  -- Estado del Pedido
  estado ENUM('pendiente', 'confirmado', 'preparando', 'listo_recojo', 'en_camino', 'entregado', 'cancelado') DEFAULT 'pendiente',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_entrega_estimada DATETIME,
  fecha_entrega_real DATETIME,
  
  -- Detalles Financieros
  subtotal DECIMAL(10,2) NOT NULL,
  costo_envio DECIMAL(10,2) NOT NULL,
  costo_servicio DECIMAL(10,2) DEFAULT 0.00,
  descuento_aplicado DECIMAL(10,2) DEFAULT 0.00,
  total_final DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(50), -- 'tarjeta_123', 'efectivo'
  estado_pago ENUM('pendiente', 'pagado', 'reembolsado') DEFAULT 'pendiente',
  
  notas_instrucciones TEXT,
  
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id),
  FOREIGN KEY (repartidor_id) REFERENCES repartidores(id),
  FOREIGN KEY (direccion_entrega_id) REFERENCES direcciones(id)
);

CREATE TABLE IF NOT EXISTS detalle_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  nombre_producto_snapshot VARCHAR(255), -- Guardar nombre por si cambia el prod
  
  -- Opciones elegidas
  extras_json JSON, -- [{"nombre": "Queso", "precio": 1.50}, {"nombre": "Agua"}]
  notas_item TEXT,
  
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ==========================================
-- 6. SOPORTE Y CALIDAD (FEEDBACK)
-- ==========================================

CREATE TABLE IF NOT EXISTS resenas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  usuario_id INT NOT NULL,
  restaurante_id INT NOT NULL,
  repartidor_id INT,
  
  calificacion_restaurante TINYINT NOT NULL, -- 1-5
  comentario_restaurante TEXT,
  
  calificacion_repartidor TINYINT, -- 1-5
  comentario_repartidor TEXT,
  
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
);

CREATE TABLE IF NOT EXISTS tickets_soporte (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  pedido_id INT, -- Opcional
  asunto VARCHAR(255) NOT NULL,
  estado ENUM('abierto', 'en_proceso', 'resuelto', 'cerrado') DEFAULT 'abierto',
  prioridad ENUM('baja', 'media', 'alta') DEFAULT 'media',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE TABLE IF NOT EXISTS mensajes_chat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT, -- Si es soporte
  pedido_id INT, -- Si es chat con repartidor
  emisor_tipo ENUM('usuario', 'soporte', 'repartidor') NOT NULL,
  emisor_id INT NOT NULL,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  leido BOOLEAN DEFAULT FALSE
);

-- ==========================================
-- 7. SEEDERS BÁSICOS (Datos Iniciales)
-- ==========================================

INSERT INTO niveles_fidelidad (nombre, puntos_minimos, beneficios_json) VALUES
('Bronce', 0, '{"envio_gratis": false}'),
('Plata', 1000, '{"envio_gratis": "50% off"}'),
('Oro', 5000, '{"envio_gratis": true, "soporte_prioritario": true}');

INSERT INTO usuarios (email, password, nombre, apellido, telefono, nivel_id) VALUES
('demo@user.com', 'demo123', 'Luis', 'Usuario', '999111222', 1);

INSERT INTO categorias (nombre, slug, icono, color) VALUES
('Hamburguesas', 'hamburguesas', 'hamburger', '#ffedd5'),
('Pizza', 'pizza', 'pizza-slice', '#fee2e2');

INSERT INTO restaurantes (nombre, tiempo_estimado_min, tiempo_estimado_max, costo_envio_base, categoria_id) VALUES
('Burger King', 25, 40, 5.00, 1),
('Pizza Hut', 40, 60, 7.00, 2);

-- (Nota: Para producción, llenar con más datos usando scripts masivos)

