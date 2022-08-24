const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "wbbbbbbe",
  host: "localhost",
  port: 5432,
  database: "testdb",
});

module.exports = { pool };
