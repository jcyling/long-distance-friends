const meetingsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Group = require("../models/group");
const User = require("../models/user");
const Meeting = require("../models/meeting");
const auth = require("../utils/auth.js");

meetingsRouter.get("/", async (req, res, next) => {
  try {
    const meetings = await Meeting
      .find({})
      .populate("bookings")
      .populate("creator",
        { "username": 1 }
      )
      .exec();
    return res.json(meetings);
  }
  catch (error) {
    next(error);
  }
});

// Get meeting by uid
meetingsRouter.get("/:id", async (req, res, next) => {
  try {
    const meeting = await Meeting
      .findOne({ "uid": req.params.id })
      .populate({
        path: "group",
        model: "Group",
        populate: {
          path: "friends",
          model: "Friend"
        }
      })
      .populate("creator",
        { "username": 1 }
      )
      .populate({
        path: "bookings",
        model: "Booking",
        populate: {
          path: "booker"
        }
      })
      .exec();

    if (!meeting) {
      return res.status(404);
    }
    return res.json(meeting);
  }
  catch (error) {
    next(error);
  }
});

// Make meetings
meetingsRouter.post("/", async (req, res, next) => {
  const body = req.body;

  // Validate user
  const token = auth.getTokenFrom(req);
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid " });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  // Validate group
  const group = await Group.findById(body.groupId);
  if (!group) {
    return res.status(404).json({
      error: "group not found"
    });
  }

  // TODO: Validate if another meeting overlaps the same window
  // if (another meeting is in the same window) {
  // return error
  // }

  const meeting = new Meeting({
    group: body.groupId,
    creator: user._id,
    window: body.window,
  });

  try {
    const savedMeeting = await meeting.save();
    group.meetings = group.meetings.concat(meeting._id);
    await group.save();
    return res.status(201).json(savedMeeting);
  }
  catch (error) {
    next(error);
  }
});

// Delete meeting
meetingsRouter.delete("/:id", async (req, res) => {
  // TODO: Constraint to only user's group
  const targetMeeting = await Meeting.findById(req.params.id);

  if (!targetMeeting) {
    return res.status(404).json({
      error: "meeting not found"
    });
  }
  await Meeting.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

module.exports = meetingsRouter;