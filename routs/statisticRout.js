const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const shortid = require("shortid");

router.get("/:username", (req, res) => {
  try {
    const userName = req.params.username;
    const dataBase = JSON.parse(fs.readFileSync(`./users/${userName}.json`, "utf-8"));
    const userStatisticArr = [];
    for (let key in dataBase) {
      userStatisticArr.push(dataBase[key]);
    }
    res.send(userStatisticArr);
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
});

router.get("/:username/:shortid", (req, res) => {
  try {
    const userName = req.params.username;
    const shortId = req.params.shortid;
    const dataBase = JSON.parse(fs.readFileSync(`./users/${userName}.json`, "utf-8"));
    res.send(dataBase[shortId]);
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
});

module.exports = router;
