import { createPool } from 'mysql2/promise';
import config from '../environments/index.js';

// Pool de conexiones a MySQL
export const pool = createPool({
  user:     config.db.user,
  password: config.db.password,
  host:     config.db.host,
  port:     config.db.port,
  database: config.db.database
});
