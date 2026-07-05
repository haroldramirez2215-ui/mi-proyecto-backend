import { pool } from '../config/db/basedatos.js';

// GET /api/movimientos - Consultar todos los movimientos
export const consultarMovimientos = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT m.*, 
             med.nombre AS medicamento_nombre,
             c.nombre AS cliente_nombre, c.apellido AS cliente_apellido
      FROM movimientos m
      LEFT JOIN medicamentos med ON m.medicamento_id = med.id
      LEFT JOIN clientes c ON m.cliente_id = c.id
      ORDER BY m.fecha DESC
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar movimientos', detalle: error.message });
  }
};

// GET /api/movimientos/:id - Consultar un movimiento por ID
export const consultarMovimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`
      SELECT m.*, 
             med.nombre AS medicamento_nombre,
             c.nombre AS cliente_nombre, c.apellido AS cliente_apellido
      FROM movimientos m
      LEFT JOIN medicamentos med ON m.medicamento_id = med.id
      LEFT JOIN clientes c ON m.cliente_id = c.id
      WHERE m.id = ?
    `, [id]);
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar movimiento', detalle: error.message });
  }
};

// POST /api/movimientos - Registrar entrada o salida de medicamento
// tipo: 'entrada' o 'salida'
export const insertarMovimiento = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const { medicamento_id, cliente_id, tipo, cantidad, observaciones } = req.body;

    // Verificar stock disponible
    const [[med]] = await conn.query('SELECT stock FROM medicamentos WHERE id = ?', [medicamento_id]);
    if (!med) {
      await conn.rollback();
      return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
    }

    if (tipo === 'salida' && med.stock < cantidad) {
      await conn.rollback();
      return res.status(400).json({
        mensaje: 'Stock insuficiente',
        stock_disponible: med.stock,
        cantidad_solicitada: cantidad
      });
    }

    // Registrar movimiento
    const [result] = await conn.query(
      'INSERT INTO movimientos (medicamento_id, cliente_id, tipo, cantidad, observaciones) VALUES (?, ?, ?, ?, ?)',
      [medicamento_id, cliente_id || null, tipo, cantidad, observaciones || '']
    );

    // Actualizar stock del medicamento
    const nuevoStock = tipo === 'entrada'
      ? med.stock + Number(cantidad)
      : med.stock - Number(cantidad);

    await conn.query('UPDATE medicamentos SET stock = ? WHERE id = ?', [nuevoStock, medicamento_id]);

    await conn.commit();
    res.status(201).json({
      mensaje: `${tipo === 'entrada' ? 'Entrada' : 'Salida'} registrada exitosamente`,
      id: result.insertId,
      stock_actual: nuevoStock
    });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ error: 'Error al registrar movimiento', detalle: error.message });
  } finally {
    conn.release();
  }
};

// PATCH /api/movimientos/:id - Modificar observaciones de un movimiento
export const modificarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { observaciones } = req.body;
    const [result] = await pool.query(
      'UPDATE movimientos SET observaciones = ? WHERE id = ?',
      [observaciones, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
    }
    res.json({ mensaje: 'Movimiento modificado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar movimiento', detalle: error.message });
  }
};

// DELETE /api/movimientos/:id - Eliminar un movimiento
export const eliminarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM movimientos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
    }
    res.json({ mensaje: 'Movimiento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar movimiento', detalle: error.message });
  }
};

// GET /api/movimientos/stock/disponible - Ver stock actual de todos los medicamentos
export const consultarStock = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT id, nombre, stock, categoria FROM medicamentos ORDER BY nombre'
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar stock', detalle: error.message });
  }
};
