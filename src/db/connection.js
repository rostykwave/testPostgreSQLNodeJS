const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

// pool.connect();

// pool.query("Select * from users", (err, res) => {
//   if (!err) {
//     console.log("res", res.rows);
//   } else {
//     console.log("error", err.message);
//   }

//   pool.end();
// });

module.exports = { pool };
