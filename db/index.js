const { Pool } = require("pg");

// Create new pool
const pool = new Pool();

// Pool error handling
pool.on("error", (err, client) => {
  console.error("Error:", err);
});

module.exports = pool;
