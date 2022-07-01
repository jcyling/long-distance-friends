const bookingsRouter = require("express").Router();
const Booking = require("../models/booking");
const Group = require("../models/group");
const Meeting = require("../models/meeting");

// Get all bookings
bookingsRouter.get("/", async (req, res, next) => {
  try {
    const booking = await Booking
      .find({})
      .populate("booker",
        { "name": 1, "timezone": 1 })
      .populate("meeting",
        { "window": 1 }
      )
      .exec();
    return res.json(booking);
  }
  catch (error) {
    next(error);
  }
});

// Get a booking
bookingsRouter.get("/:id", async (req, res, next) => {
  try {
    const booking = await Booking
      .findById(req.params.id)
      .populate("booker",
        { "name": 1, "timezone": 1 })
      .populate("meeting",
        { "window": 1 }
      )
      .exec();
    return res.json(booking);
  }
  catch (error) {
    next(error);
  }
});

bookingsRouter.post("/", async (req, res, next) => {
  const body = req.body;

  // Validate group
  const group = await Group.findById(body.groupId);
  if (!group) {
    return res.status(404).json({
      error: "group not found"
    });
  }

  // TODO: Validate friend in group

  // Validate meeting 
  const meeting = await Meeting.findById(body.meetingId);
  if (!meeting) {
    return res.status(404).json({
      error: "meeting not found"
    });
  }

  const window = meeting.window;

  // Validate date is within meeting window
  const dateCheck = body.availability.every((item) => {
    // Format date
    let dateToCheck = new Date(item.datetime);
    return (dateToCheck < window.startDate || dateToCheck > window.endDate) ? true : false;
  });

  if (dateCheck) {
    return res.status(400).json({
      error: "booking is outside window of availability for meeting"
    });
  }

  const booking = new Booking({
    group: body.groupId,
    meeting: body.meetingId,
    availability: body.availability,
    booker: body.booker,
    bookerModel: body.bookerModel
  });

  try {
    const savedBooking = await booking.save();
    meeting.bookings = meeting.bookings.concat(booking._id);
    await meeting.save();
    return res.status(201).json(savedBooking);
  }
  catch (error) {
    next(error);
  }
});

bookingsRouter.delete("/:id", async (req, res) => {
  const targetBooking = await Booking.findById(req.params.id);

  if (!targetBooking) {
    return res.status(404).json({
      error: "booking not found"
    });
  }

  await Booking.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

module.exports = bookingsRouter;