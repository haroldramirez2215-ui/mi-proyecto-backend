import { Router } from 'express';
import clientesRoutes     from './clientes.routes.js';
import medicamentosRoutes from './medicamentos.routes.js';
import movimientosRoutes  from './movimientos.routes.js';

const router = Router();

router.use('/clientes',     clientesRoutes);
router.use('/medicamentos', medicamentosRoutes);
router.use('/movimientos',  movimientosRoutes);

export default router;
