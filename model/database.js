require("dotenv").config();

const mysql = require("mysql");

var file = process.argv[2];
console.log("file is: ", file);

const fs = require("fs");
const migrationSQL = fs.readFileSync(__dirname + "/" + file).toString();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "learndash",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(migrationSQL, function (err, result) {
    if (err) throw err;
    console.log("Migration was completed");
  });

  con.end();
});
