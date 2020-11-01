var express = require("express");
var router = express.Router();
var db = require("../model/helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");

router.post("/login", async (req, res) => {
  //res.send("yes user endpoint is working");
  const { username, password } = req.body;

  const results = await db(
    `SELECT * FROM users WHERE username = "${username}" AND password="${password}"`
  );
  const user = results.data[0];
  if (user) {
    //the user exists
    //res.send("valid user");
    //generate the token and send it back to the user
    var token = jwt.sign({ user_id: user.id }, supersecret);
    //send the key to the user
    res.send({ message: "Login successful, here's your token", token });
  } else {
    //user does not exist
    res.status(401).send("invalid user");
  }
});

router.get("/profile", userMustBeLoggedIn, async (req, res) => {
  const results = await db(
    `SELECT username FROM users WHERE id = ${req.decoded.user_id}`
  );
  res.send({
    message: "here's your private data",
    data: results.data[0],
  });
});

module.exports = router;
