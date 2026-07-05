import { Router } from 'express';
import {
  consultarMedicamentos,
  consultarMedicamentoPorId,
  insertarMedicamento,
  modificarMedicamento,
  eliminarMedicamento
} from '../controllers/medicamentoController.js';

const router = Router();

router.get('/',        consultarMedicamentos);      // Todos los medicamentos
router.get('/:id',    consultarMedicamentoPorId); // Un medicamento por ID
router.post('/',       insertarMedicamento);         // Crear medicamento
router.patch('/:id',  modificarMedicamento);        // Modificar medicamento
router.delete('/:id', eliminarMedicamento);         // Eliminar medicamento

export default router;
