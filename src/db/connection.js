const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "wbbbbbbe",
  host: "localhost",
  port: 5432,
  database: "testdb",
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
