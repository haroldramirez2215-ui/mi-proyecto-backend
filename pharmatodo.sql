-- ============================================================
--  PharmaTo-do  |  Script de base de datos
-- ============================================================

CREATE DATABASE IF NOT EXISTS pharmatodo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pharmatodo;

-- ------------------------------------------------------------
-- Tabla: clientes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clientes (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  apellido   VARCHAR(100) NOT NULL,
  telefono   VARCHAR(20),
  email      VARCHAR(150),
  documento  VARCHAR(30),
  creado_en  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabla: medicamentos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS medicamentos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock       INT NOT NULL DEFAULT 0,
  categoria   VARCHAR(80),
  creado_en   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabla: movimientos  (entradas y salidas)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS movimientos (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  medicamento_id  INT NOT NULL,
  cliente_id      INT,
  tipo            ENUM('entrada', 'salida') NOT NULL,
  cantidad        INT NOT NULL,
  observaciones   TEXT,
  fecha           DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id),
  FOREIGN KEY (cliente_id)     REFERENCES clientes(id)
);

-- ------------------------------------------------------------
-- Datos de prueba
-- ------------------------------------------------------------
INSERT INTO clientes (nombre, apellido, telefono, email, documento) VALUES
  ('Carlos',  'Ramírez',  '3001234567', 'carlos@email.com',  '1023456789'),
  ('Lucía',   'Gómez',    '3119876543', 'lucia@email.com',   '9876543210'),
  ('Andrés',  'Torres',   '3205551234', 'andres@email.com',  '1122334455');

INSERT INTO medicamentos (nombre, descripcion, precio, stock, categoria) VALUES
  ('Acetaminofén 500mg', 'Analgésico y antipirético', 1500.00,  50, 'Analgésico'),
  ('Ibuprofeno 400mg',   'Antiinflamatorio',          2200.00,  30, 'AINE'),
  ('Amoxicilina 500mg',  'Antibiótico de amplio espectro', 8500.00, 20, 'Antibiótico'),
  ('Loratadina 10mg',    'Antihistamínico',            3000.00,  40, 'Antihistamínico');

INSERT INTO movimientos (medicamento_id, cliente_id, tipo, cantidad, observaciones) VALUES
  (1, NULL, 'entrada', 50, 'Compra inicial de inventario'),
  (2, NULL, 'entrada', 30, 'Compra inicial de inventario'),
  (3, NULL, 'entrada', 20, 'Compra inicial de inventario'),
  (4, NULL, 'entrada', 40, 'Compra inicial de inventario'),
  (1, 1,    'salida',   2, 'Venta a cliente Carlos Ramírez'),
  (2, 2,    'salida',   1, 'Venta a cliente Lucía Gómez');

-- Ajustar stock tras las salidas de ejemplo
UPDATE medicamentos SET stock = 48 WHERE id = 1;
UPDATE medicamentos SET stock = 29 WHERE id = 2;
