const { Pool } = require('pg');

// Configuración:
// DATABASE_URL (Producción/Render + Neon), uso con soporte SSL.

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;
