import app from './app/server.js';
import config from './app/config/environments/index.js';
import { Router } from 'express';
import clientesRoutes     from './clientes.routes.js';
import medicamentosRoutes from './medicamentos.routes.js';
import movimientosRoutes  from './movimientos.routes.js';

const router = Router();

router.use('/clientes',     clientesRoutes);
router.use('/medicamentos', medicamentosRoutes);
router.use('/movimientos',  movimientosRoutes);


const PORT = config.port;

app.listen(PORT, () => {
  console.log(`✅ PharmaTo-do API corriendo en http://localhost:${PORT}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
