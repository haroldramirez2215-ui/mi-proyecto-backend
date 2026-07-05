import { Router } from 'express';
import {
  consultarClientes,
  consultarClientePorId,
  insertarCliente,
  modificarCliente,
  eliminarCliente
} from '../controllers/clienteController.js';

const router = Router();

router.get('/',        consultarClientes);       // Todos los clientes
router.get('/:id',    consultarClientePorId);   // Un cliente por ID
router.post('/',       insertarCliente);          // Crear cliente
router.patch('/:id',  modificarCliente);         // Modificar cliente
router.delete('/:id', eliminarCliente);          // Eliminar cliente

export default router;
