const mysql = require("mysql");
const { dbConfig } = require("../config.json");

let con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected !");
  con.query("CREATE DATABASE IF NOT EXISTS laboumba", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
