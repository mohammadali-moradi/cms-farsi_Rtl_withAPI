const mysql = require("mysql");

const myShopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_shop",
  port: 3306
});

module.exports = myShopDB;
