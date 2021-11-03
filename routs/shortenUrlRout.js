const express = require("express");
const path = require("path");
const shortid = require("shortid"); //short id generateor
const router = express.Router();
const fs = require("fs");
const { json } = require("body-parser");

const baseUrl = "http://localhost:3000/short/";

router.post("/", (req, res) => {
  shortUrl = shortid.generate();
  longUrl = req.body.url;
  dataBase = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  for (let key in dataBase) {
    if (dataBase[key] === longUrl) {
      return res.send(baseUrl + key);
    }
  }
  dataBase[shortUrl] = longUrl;
  fs.writeFileSync("./db.json", JSON.stringify(dataBase));
  res.send(baseUrl + shortUrl);
});

router.get("/:shortUrl", (req, res) => {
  dataBase = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  console.log(dataBase[req.params.shortUrl]);
  res.redirect(301, dataBase[req.params.shortUrl]);
  res.end();
});

module.exports = router;
