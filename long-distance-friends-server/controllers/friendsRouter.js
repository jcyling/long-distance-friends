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

  try {
    const latlng = await helpers.convertLocationToLatLong(body.city);
    const timezone = await helpers.convertLatLongToTimezone(latlng);

    const friend = new Friend({
      name: body.name,
      city: body.city,
      timezone: timezone.iana,
      offset: timezone.offset,
      latlng: [latlng.lng, latlng.lat],
      group: group._id,
      email: undefined
    });
  
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

  if (body.city) {
    const latlng = await helpers.convertLocationToLatLong(body.city);
    body.latlng = [latlng.lat, latlng.lng];
    const timezone = await helpers.convertLatLongToTimezone(latlng);
    body.timezone = timezone.iana;
    body.offset = timezone.offset;
  }

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

friendsRouter.delete("/:id", async (req, res) => {
  const targetFriend = await Friend.findById(req.params.id);

  if (!targetFriend) {
    return res.status(404).json({
      error: "Friend not found"
    });
  }

  targetFriend.deleteOne();

  // await Friend.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

module.exports = friendsRouter;