import { Router } from 'express';
import {
  consultarMovimientos,
  consultarMovimientoPorId,
  insertarMovimiento,
  modificarMovimiento,
  eliminarMovimiento,
  consultarStock
} from '../controllers/movimientoController.js';

const router = Router();

router.get('/stock/disponible', consultarStock);        // Stock actual de medicamentos
router.get('/',                 consultarMovimientos);  // Todos los movimientos
router.get('/:id',             consultarMovimientoPorId); // Un movimiento por ID
router.post('/',                insertarMovimiento);    // Registrar entrada/salida
router.patch('/:id',           modificarMovimiento);   // Modificar observaciones
router.delete('/:id',          eliminarMovimiento);    // Eliminar movimiento

export default router;
