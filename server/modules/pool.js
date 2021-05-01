// node module will connect to PG
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool ({
    database: 'react_gallery',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
})

pool.on('connect', () => {
    console.log('Connected to Postgresql :)');
});

pool.on('error', (error) => {
    console.log("error connecting to Postgresql:", error);
});

module.exports = pool;