const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginRouter = require("express").Router();

// Login
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password"
    });
  }

  // Record logged in user
  const userForToken = {
    username: user.username,
    id: user._id
  };

  console.log(userForToken);

  // Generate token for such user
  const token = jwt.sign(userForToken, process.env.SECRET);

  // Send token to browser
  return res
    .status(200)
    .send({ token, username: user.username, name: user.name, id:user._id });
});

module.exports = loginRouter;