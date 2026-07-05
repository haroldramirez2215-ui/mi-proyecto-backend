import { createPool } from 'mysql2/promise';
import config from '../environments/index.js';
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
// Pool de conexiones a MySQL
export const pool = createPool({
  user:     config.db.user,
  password: config.db.password,
  host:     config.db.host,
  port:     config.db.port,
  database: config.db.database
});
