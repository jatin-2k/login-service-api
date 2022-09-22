const { Pool } = require('pg');

require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_DEV,
});

module.exports = pool;

// pool.query('select * from test_table')
//     .then((res) => {
//         console.log(`RESULT:`);
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(`ERROR:`);
//         console.log(err);
//     })