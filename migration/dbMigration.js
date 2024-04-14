const mysql = require("mysql");
const { dbConfig } = require("../config.json");

let connect = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: 8889,
  database: dbConfig.database,
});

connect.connect(function (err) {
  if (err) throw err;
  console.log("Successfully connect to the database");
  const sql_bomb =
    "INSERT INTO bomb (name, radiusX, radiusY, diagRadius, renew, damage, speed, timer ,imageLink) VALUES ? ";
  const values_bomb = [
    ["pomme", 1, 1, 0, true, 1, 0, 3000, "url2"],
    ["grenade", 0, 0, 2, false, 1, 0, 3000, "url"],
    ["pasteque", 0, 0, 100, false, 10, 0, 3000, "url"],
    ["citron", 1, 1, 0, false, 1, 2, 3000, "url"],
    ["mure", 10, 0, 0, false, 1, 0, 3000, "url"],
    ["myrtille", 1, 1, 10, false, 4, 0, 3000, "url"],
  ];
  const sql_obstacle =
    "INSERT INTO obstacle (name, destructible, healpoint, bombReward, bonusReward, pastequeReward, imageLink) VALUES ? ";
  const values_obstacle = [
    ["box", true, 1, 0.3, 0.3, 0.000001, "url"],
    ["brick", true, 2, 0.5, 0.5, 0.00001, "url"],
    ["rock", false, 1, 0, 0, 0, "url"],
  ];
  const sql_bonus =
    "INSERT INTO bonus (name, bombRadius, bombAmount, playerSpeed, bombDamage) VALUES ? ";
  const values_bonus = [
    ["upRadius", 1, 0, 0, 0],
    ["upAmount", 0, 1, 0, 0],
    ["upSpeed", 0, 0, 1, 0],
    ["upDamage", 0, 0, 0, 1],
  ];
  connect.query(sql_bomb, [values_bomb], function (err, result) {
    if (err) throw err;
    console.log("Database bomb successfully modified");
  });
  connect.query(sql_obstacle, [values_obstacle], function (err, result) {
    if (err) throw err;
    console.log("Database obstacle successfully modified");
  });
  connect.query(sql_bonus, [values_bonus], function (err, result) {
    if (err) throw err;
    console.log("Database bonus successfully modified");
  });
});
