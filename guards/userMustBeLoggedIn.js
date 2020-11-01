const jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userMustBeLoggedIn(req, res, next) {
  //check if the front-end sent a key

  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).send("Please provide a token");
  } else {
    //since there's a key
    //check if the key is valid
    jwt.verify(token, supersecret, function (err, decoded) {
      //err
      if (err) {
        res.status(401).send(err.message);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
}

module.exports = userMustBeLoggedIn;
