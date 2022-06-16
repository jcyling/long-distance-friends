const jwt = require("jsonwebtoken");
const Group = require("../models/group");
const User = require("../models/user");
const groupRouter = require("express").Router();
const auth = require("../utils/auth.js");

// Get all groups
groupRouter.get("/", async (req, res, next) => {
  try {
    const groups = await Group.find({}).populate("admin", { "username": 1, "name": 1, "timezone": 1 });
    return res.json(groups);
  }
  catch (error) {
    next(error);
  }
});

// Make new group
groupRouter.post("/", async (req, res, next) => {
  const body = new Group(req.body);

  const token = auth.getTokenFrom(req);
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid " });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

  const group = new Group({
    name: body.name,
    admin: user._id
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

// Edit group
groupRouter.patch("/:id", async (req, res, next) => {
  // TODO: Constraint to only user's group

  try {
    if (!req.body || !req.params.id) {
      return res.status(400).json({ message: "Incorrect request content" });
    }

    const body = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, body, { new: true });

    return res.status(200).json(updatedGroup);
  }
  catch (error) {
    next(error);
  }
});

// Delete group
groupRouter.delete("/:id", async (req, res) => {
  // TODO: Constraint to only user's group
  await Group.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

module.exports = groupRouter;