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
  console.log("Successfully connect to the database");

  // Bomb Table Creation
  const sql_bomb =
    "CREATE TABLE IF NOT EXISTS bomb (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), radiusX INT, radiusY INT, diagRadius INT, renew BOOLEAN, damage INT, speed INT, timer INT, imageLink VARCHAR(255))";
  connect.query(sql_bomb, function (err, result) {
    if (err) throw err;
    console.log("Database bomb successfully created");
  });

  // Bonus Table Creation
  const sql_bonus =
    "CREATE TABLE IF NOT EXISTS bonus (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), bombRadius INT, bombAmount INT, playerSpeed INT, bombDamage INT)";
  connect.query(sql_bonus, function (err, result) {
    if (err) throw err;
    console.log("Database bonus successfully created");
  });

  // Obstacle Table Creation
  const sql_obstacle =
    "CREATE TABLE IF NOT EXISTS obstacle (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), destructible BOOLEAN, healpoint INT, bombReward INT, bonusReward INT, pastequeReward INT, imageLink VARCHAR(255))";
  connect.query(sql_obstacle, function (err, result) {
    if (err) throw err;
    console.log("Database obstacle successfully created");
  });
});
