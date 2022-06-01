const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();

// List of users
usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

// Account creation
usersRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(401).json({
      error: "missing username or password or name"
    });
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(401).json({
      error: "username and password must be more than 3 chars long"
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      error: "username must be unique"
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  // Return login token
  const token = jwt.sign(savedUser, process.env.SECRET);

  return res
    .status(201)
    .send({ token, username: user.username, name: user.name });
});

module.exports = usersRouter;