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
  const sql =
    "INSERT INTO bombs (name, radius, diagRadius, cooldown, imageLink) VALUES ? ";
  const values = [
    ["grenade", 3, 0, 4, "url2"],
    ["pêche", 0, 3, 4, "url2"],
  ];
  connect.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Database successfully created");
  });
});
