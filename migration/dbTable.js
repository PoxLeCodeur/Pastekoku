const mysql = require("mysql");
const { dbConfig } = require("../config.json");

let connect = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.database,
});

connect.connect(function (err) {
  if (err) throw err;
  console.log("Succesfully connected to database");
  const sql =
    "CREATE TABLE IF NOT EXISTS bombs (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), radius INT, diagRadius INT, cooldown INT, imageLink VARCHAR(255))";
  connect.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
