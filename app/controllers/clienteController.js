import { pool } from '../config/db/basedatos.js';

// GET /api/clientes - Consultar todos los clientes
export const consultarClientes = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM clientes');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar clientes', detalle: error.message });
  }
};

// GET /api/clientes/:id - Consultar un cliente por ID
export const consultarClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar cliente', detalle: error.message });
  }
};

// POST /api/clientes - Insertar un nuevo cliente
export const insertarCliente = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, documento } = req.body;
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, apellido, telefono, email, documento) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, telefono, email, documento]
    );
    res.status(201).json({
      mensaje: 'Cliente registrado exitosamente',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar cliente', detalle: error.message });
  }
};

// PATCH /api/clientes/:id - Modificar un cliente
export const modificarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, documento } = req.body;
    const [result] = await pool.query(
      'UPDATE clientes SET nombre=?, apellido=?, telefono=?, email=?, documento=? WHERE id=?',
      [nombre, apellido, telefono, email, documento, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente modificado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar cliente', detalle: error.message });
  }
};

// DELETE /api/clientes/:id - Eliminar un cliente
export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM clientes WHERE id=?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente', detalle: error.message });
  }
};
