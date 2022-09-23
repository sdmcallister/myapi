import mysql from 'mysql2/promise';

// for experiments and not actual deployments!!!
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'world',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});