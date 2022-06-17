const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
const helpers = require("../utils/helpers");

// List of users
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("groups");
  return res.json(users);
});

// Specific user
usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("groups");
  return res.json(user);
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

usersRouter.patch("/:id", async (req, res, next) => {

  // TODO: Restrict changes to user only
  const body = req.body;
  
  body.timezone = await helpers.convertLocationToTimezone(body.city);

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, body, { new: true });
    return res.json(updatedUser);
  }
  catch (error) {
    next(error);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  }
  catch (error) {
    next(error);
  }
});

module.exports = usersRouter;