const Pool = require('pg').Pool;
require('dotenv').config();

const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,

  // connectionString: process.env.DATABASE_URI,
});

db.on('error', (error) => {
  console.error('Connection Error:', error);
  process.exit(-1);
});

const query = (text, params) => db.query(text, params);

module.exports = query;
