const express = require("express");
const MyShopDB = require("./../db/My_Shop");

const adminsRouter = express.Router();

// routes

adminsRouter.get("/", (req, res) => {
  let adminToken = req.headers.authorization;

  let selectMainAdminQuery = `SELECT * FROM Admins WHERE token = "${adminToken}"`;

  MyShopDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
