// const app = require("./app");
const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const shortenUrlRout = require("./routs/shortenUrlRout");
app.use(cors());

app.use(express.json()); // parses requests as json

app.use("/", express.static(`./front/dist`));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./front/dist/index.html"));
});

app.use("/short", shortenUrlRout);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
