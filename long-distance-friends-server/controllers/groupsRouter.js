const jwt = require("jsonwebtoken");
const Group = require("../models/group");
const User = require("../models/user");
const groupRouter = require("express").Router();
const auth = require("../utils/auth.js");

groupRouter.get("/", async (req, res, next) => {
  try {
    const groups = await Group.find({}).populate("admin", {"username": 1, "name": 1, "timezone": 1});
    return res.json(groups);
  }
  catch (error) {
    next(error);
  }
});

groupRouter.post("/", async (req, res, next) => {

  // ? Constraints

  const body = new Group(req.body);

  const token = auth.getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid "});
  }

  const user = await User.findById(decodedToken.id);
  const group = new Group({
    name: body.name,
    admin: user._id,
    friends: body.friends
  });

  try {
    const savedGroup = await group.save();
    user.groups = user.groups.concat(savedGroup._id);
    await user.save();
    return res.status(201).json(savedGroup);
  }
  catch (error) {
    next(error);
  }
});

groupRouter.put("/", async () => {
  
});

groupRouter.delete("/", async () => {
  
});

module.exports = groupRouter;