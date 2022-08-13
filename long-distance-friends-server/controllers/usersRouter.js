const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
const helpers = require("../utils/helpers");
const mongoose = require("mongoose");

// List of users
usersRouter.get("/", async (req, res) => {
  const users = await User
    .find({});
  return res.json(users);
});

// Specific user
usersRouter.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return false;
  const user = await User
    .findById(req.params.id)
    .populate({
      path: "groups",
      model: "Group",
      populate: [{
        path: "friends",
        model: "Friend"
      },
      {
        path: "meetings",
        model: "Meeting"
      }]
    });
  return res.json(user);
});

// Account creation
usersRouter.post("/", async (req, res, next) => {
  const { username, email, password, name, city } = req.body;

  if (!username || !email || !password || !name || !city) {
    return res.status(401).json({
      error: "Missing username or password or name or city or email"
    });
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(401).json({
      error: "Username and password must be more than 3 chars long"
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      error: "Username must be unique"
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const timezone = await helpers.convertLocationToTimezone(city);

  const user = new User({
    username,
    name,
    passwordHash,
    city,
    timezone,
    email
  });

  try {
    const savedUser = await user.save();
    if (savedUser) {
      // Return login token
      const token = jwt.sign(savedUser.toJSON(), process.env.SECRET);

      return res
        .status(201)
        .send({ token, username: user.username, name: user.name });
    }
    else {
      return res.status(400).json({
        error: "Account creation failed"
      });
    }
  }
  catch (error) {
    next(error);
  }

});

usersRouter.patch("/:id", async (req, res, next) => {

  // TODO: Restrict changes to user only
  const body = req.body;

  if (body.city) {
    body.timezone = await helpers.convertLocationToTimezone(body.city);
    body.latlng = await helpers.convertLocationToLatLong(body.city);
  }

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