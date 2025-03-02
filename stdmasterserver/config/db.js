const Pool = require('pg').Pool;
require('dotenv').config();

const poolConfig = {
  max: 5,
  min: 2,
  idleTimeoutMillis: 600000,
};

const userName = process.env.PG_USER;
const host = process.env.PG_HOST;
const database = process.env.PG_DATABASE;
const password = process.env.PG_PASSWORD;
const port = process.env.PG_PORT;

poolConfig.connectionString = `postgresql://${userName}:${password}@${host}:${port}/${database}`;

const db = new Pool(poolConfig);

db.on('error', (error) => {
  console.error('Connection Error:', error);
  process.exit(-1);
});

const query = (text, params) => db.query(text, params);

module.exports = query;
