const friendsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Friend = require("../models/friend");
const Group = require("../models/group");
const User = require("../models/user");
const auth = require("../utils/auth.js");
const helpers = require("../utils/helpers.js");

// Add new friend
friendsRouter.post("/", async (req, res, next) => {
  const body = req.body;

  const token = auth.getTokenFrom(req);
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const group = await Group.findById(body.groupId);

  if (!group) {
    return res.status(401).json({ error: "group not found" });
  }

  const timezone = await helpers.convertLocationToTimezone(body.city);

  const friend = new Friend({
    name: body.name,
    city: body.city,
    timezone: timezone,
    group: group._id
  });

  try {
    const savedFriend = await friend.save();
    group.friends = group.friends.concat(savedFriend._id);
    await group.save();
    return res.status(201).json(savedFriend);
  }
  catch (error) {
    next(error);
  }
});

friendsRouter.patch("/:id", async (req, res, next) => {
  if (!req.body || !req.params.id) {
    return res.status(400).json({ message: "Incorrect request content" });
  }

  const body = req.body;
  try {
    const friendInfo = {
      ...body,
    };

    const updatedFriend = await Friend.findByIdAndUpdate(req.params.id, friendInfo, { new: true });

    return res.status(200).json(updatedFriend);
  }
  catch (error) {
    next(error);
  }
});

module.exports = friendsRouter;