import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga el archivo .env según el entorno (development o production)
const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? 'production.env' : 'developer.env';

dotenv.config({
  path: path.resolve(__dirname, envFile)
});

const config = {
  port: process.env.PORT || 3000,
  db: {
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME
  }
};

export default config;
