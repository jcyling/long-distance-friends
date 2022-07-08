const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginRouter = require("express").Router();

// Login
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !password) {
    return res.status(401).json({
      error: "Missing username or password"
    });
  }

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "Invalid username or password"
    });
  }

  // Record logged in user
  const userForToken = {
    username: user.username,
    id: user._id
  };

  // Generate token for such user
  const token = jwt.sign(userForToken, process.env.SECRET);

  // Send token to browser
  return res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id, timezone: user.timezone });
});

module.exports = loginRouter;