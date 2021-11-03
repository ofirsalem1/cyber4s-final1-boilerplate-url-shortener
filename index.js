// const app = require("./app");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/", express.static(`./front/dist`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/dist/index.html");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
