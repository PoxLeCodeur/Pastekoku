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
    "INSERT INTO boumbas (name, radius, diagRadius, timer, cooldown, image) VALUES ?";
  const values = [
    ["ClassicBomb", 1, 1, 3, 4, "link"],
    ["Advancedbomb1", 2, 2, 2, 4, "link"],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Succesfully inserted : " + result.affectedRows);
  });
});
