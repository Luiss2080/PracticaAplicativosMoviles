DROP TABLE IF EXISTS metodos_pago;
CREATE TABLE metodos_pago (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo VARCHAR(50) DEFAULT 'tarjeta',
  marca VARCHAR(50), -- visa, mastercard
  ultimos_digitos VARCHAR(4),
  token_falso VARCHAR(255),
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO metodos_pago (usuario_id, marca, ultimos_digitos) VALUES (1, 'visa', '4242');
