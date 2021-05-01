// node module will connect to PG
const pg = require('pg');

const config = {
    database: 'react_gallery',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log('Connected to Postgresql :)');
});

pool.on("error", (error) => {
    console.log("error connecting to Postgresql:", error);
});

module.exports = pool;

