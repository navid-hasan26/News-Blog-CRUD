const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  //database: "",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});
