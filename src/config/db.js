const { Pool } = require('pg');

// La configuración se lee automáticamente de las variables de entorno en el archivo .env
// (DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_PORT)
const pool = new Pool();

module.exports = pool;
