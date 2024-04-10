const mysql = require("mysql2/promise");
const { dbConfig } = require("../config.json");

async function query(sql, parameters) {
  const connection = await mysql.createConnection(dbConfig);
  const [results] = await connection.execute(sql, parameters);

  return results;
}

module.exports = {
  query,
};
