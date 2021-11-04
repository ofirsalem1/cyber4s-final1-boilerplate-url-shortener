const fs = require("fs");
const path = require("path");

function userHandler(req, res, next) {
  if (!req.body.username) {
    throw { status: 401, message: "missing username" };
  }
  const usreFolderPath = path.resolve(`./users`, req.body.username);
  if (!fs.existsSync(usreFolderPath)) {
    fs.mkdirSync(usreFolderPath);
  }
  next();
}

module.exports = { userHandler };
