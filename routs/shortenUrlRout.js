const express = require("express");
const path = require("path");
const shortid = require("shortid"); //short id generateor
const router = express.Router();
const fs = require("fs");
const { json } = require("body-parser");

const baseUrl = "http://localhost:3000/short/";

router.post("/", (req, res) => {
  try {
    shortId = shortid.generate();
    longUrl = req.body.url;
    dataBase = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    for (let key in dataBase) {
      if (dataBase[key].longUrl === longUrl) {
        return res.send(baseUrl + dataBase[key].shortId);
      }
    }
    const urlObj = { shortId, longUrl, creationDate: new Date(Date.now()), redirectCount: 0 };
    dataBase[shortId] = urlObj;
    fs.writeFileSync("./db.json", JSON.stringify(dataBase));
    res.send(baseUrl + shortId);
  } catch (error) {
    throw { /*status: "404",*/ message: "there was an error" };
  }
});

router.get("/:shortid", (req, res) => {
  try {
    const shortId = req.params.shortid;
    const dataBase = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    dataBase[shortId]["redirectCount"] += 1;
    fs.writeFileSync("./db.json", JSON.stringify(dataBase));
    res.redirect(301, dataBase[shortId].longUrl);
  } catch (error) {
    throw { /*status: "404",*/ message: "there was an error" };
  }
});

module.exports = router;
