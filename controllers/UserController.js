const { Router } = require("express");

const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

const SECRET = "ademo";

//signup route

router.post("/signup", async (req, res) => {
  try {
    //hash

    req.body.password = await bcrypt.hash(req.body.password, 10);

    //create new user
    const user = await User.create(req.body);
    //send new user a response
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "couldnt create user" });
  }
});

//login route verify user and get a token

router.post("/login", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        //sign token and send it to response object
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesnt match" });
      }
    } else {
      res.status(400).json({ error: "User doesnt exist" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
