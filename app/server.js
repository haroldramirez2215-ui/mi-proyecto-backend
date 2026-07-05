import express from 'express';
import rutas from './routes/index.js';

const server = express();

// Middleware para parsear JSON en el body de las peticiones
server.use(express.json());

// Todas las rutas de la API bajo /api
server.use('/api', rutas);

export default server;
