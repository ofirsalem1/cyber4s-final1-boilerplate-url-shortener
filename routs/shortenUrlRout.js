const express = require("express");
const path = require("path");
const shortid = require("shortid"); //short id generateor
const router = express.Router();
const fs = require("fs");
const moment = require("moment");
const { json } = require("body-parser");

const baseUrl = "https://ofir-shorten-new.herokuapp.com/";

router.post("/", (req, res) => {
  try {
    const userName = req.body.username;
    const shortId = shortid.generate();
    const longUrl = req.body.url;
    const urlObj = { shortUrl: `${baseUrl}short/${userName}/${shortId}`, longUrl, creationDate: moment().format("lll"), redirectCount: 0 };
    if (fs.existsSync(`./users/${userName}.json`)) {
      const dataBase = JSON.parse(fs.readFileSync(`./users/${userName}.json`, "utf-8"));
      for (let key in dataBase) {
        if (dataBase[key].longUrl === longUrl) {
          return res.send(dataBase[key].shortUrl);
        }
      }
      dataBase[shortId] = urlObj;
      fs.writeFileSync(`./users/${userName}.json`, JSON.stringify(dataBase));
      res.send(baseUrl + "short/" + userName + "/" + shortId);
    } else {
      fs.writeFileSync(`./users/${userName}.json`, "{}");
      const dataBase = JSON.parse(fs.readFileSync(`./users/${userName}.json`, "utf-8"));
      dataBase[shortId] = urlObj;
      fs.writeFileSync(`./users/${userName}.json`, JSON.stringify(dataBase));
      res.send(baseUrl + "short/" + userName + "/" + shortId);
    }
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
});

router.get("/:userName/:shortid", (req, res) => {
  try {
    const userName = req.params.userName;
    const shortId = req.params.shortid;
    const dataBase = JSON.parse(fs.readFileSync(`./users/${userName}.json`, "utf-8"));
    dataBase[shortId]["redirectCount"] += 1;
    fs.writeFileSync(`./users/${userName}.json`, JSON.stringify(dataBase));
    res.redirect(301, dataBase[shortId].longUrl);
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
});

module.exports = router;

// function creatUniqeId(userName) {
//   const shortId = shortid.generate();
//   const dataBase = JSON.parse(fs.readFileSync(`./users/${userName}.json`, "utf-8"));
//   for (let key in dataBase) {
//     if (dataBase[key].shortId === longUrl) {
//       return res.send(baseUrl + dataBase[key].shortId);
//     }
//   }
// }
