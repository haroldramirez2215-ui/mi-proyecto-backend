import { pool } from '../config/db/basedatos.js';

// GET /api/medicamentos - Consultar todos los medicamentos
export const consultarMedicamentos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM medicamentos');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar medicamentos', detalle: error.message });
  }
};

// GET /api/medicamentos/:id - Consultar un medicamento por ID
export const consultarMedicamentoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * FROM medicamentos WHERE id = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar medicamento', detalle: error.message });
  }
};

// POST /api/medicamentos - Insertar un medicamento
export const insertarMedicamento = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const [result] = await pool.query(
      'INSERT INTO medicamentos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, categoria]
    );
    res.status(201).json({
      mensaje: 'Medicamento registrado exitosamente',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar medicamento', detalle: error.message });
  }
};

// PATCH /api/medicamentos/:id - Modificar un medicamento
export const modificarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const [result] = await pool.query(
      'UPDATE medicamentos SET nombre=?, descripcion=?, precio=?, stock=?, categoria=? WHERE id=?',
      [nombre, descripcion, precio, stock, categoria, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
    }
    res.json({ mensaje: 'Medicamento modificado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar medicamento', detalle: error.message });
  }
};

// DELETE /api/medicamentos/:id - Eliminar un medicamento
export const eliminarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM medicamentos WHERE id=?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
    }
    res.json({ mensaje: 'Medicamento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar medicamento', detalle: error.message });
  }
};
