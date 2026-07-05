import app from './app/server.js';
import config from './app/config/environments/index.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`✅ PharmaTo-do API corriendo en http://localhost:${PORT}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
