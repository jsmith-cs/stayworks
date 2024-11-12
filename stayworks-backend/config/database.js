const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: 'stayworks.duckdns.org',
  port: 3306,
  user: 'root',
  password: 'sbKUjZ7~A21-',
  database: 'STAYWORKSTestEnv',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Confirming connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  connection.release();
});

module.exports = { pool };