const mysql = require("mysql");
const { dbConfig } = require("../config.json");

let con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Successfully connected to the database");
  const sql =
    "CREATE TABLE IF NOT EXISTS boumbas (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), radius INT, diagRadius INT, timer INT, cooldown INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table succesfully created");
  });
});
