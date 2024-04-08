const mysql = require("mysql");
const { dbConfig } = require("../config.json");

let connect = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
});

connect.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS bomberman", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
