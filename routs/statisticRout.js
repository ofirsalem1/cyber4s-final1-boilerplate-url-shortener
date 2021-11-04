const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

router.get("/:username", (req, res) => {
  const userName = req.params.username;
  const dataBase = JSON.parse(fs.readFileSync(`./users/${userName}.json`, "utf-8"));
  const userStatisticArr = [];
  for (let key in dataBase) {
    userStatisticArr.push(dataBase[key]);
  }
  res.send(userStatisticArr);
});
module.exports = router;
