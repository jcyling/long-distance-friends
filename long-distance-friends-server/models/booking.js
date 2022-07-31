const mongoose = require("mongoose");
const helpers = require("../utils/helpers");
const emailService = require("../services/emailService");

const bookingSchema = new mongoose.Schema(
  {
    booker: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "bookerModel"
    },
    bookerModel: {
      type: String,
      required: true,
      enum: ["User", "Friend"]
    },
    timezone: {
      type: String
    },
    availability: [{
      type: mongoose.Schema.Types.Date
    }],
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting"
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  const Meeting = require("./meeting");
  const bookingId = this._id;

  Meeting.findOneAndUpdate(
    { bookings: bookingId },
    {
      $inc: { rsvps: -1 },
      $pull: { bookings: bookingId }
    }
  ).exec();
  next();
});

bookingSchema.post("save", async function (booking, next) {
  const Group = require("./group");
  const Meeting = require("./meeting");
  const User = require("./user");

  // Update meeting to increment booking count
  const meeting = await Meeting
    .findById(booking.meeting)
    .exec();
  meeting.bookings = meeting.bookings.concat(booking._id);
  meeting.rsvps += 1;
  await meeting.save();

  // Compare rsvps with number of friends in the group
  const group = await Group
    .findById(booking.group)
    .populate("friends")
    .populate("admin", {
      "username": 1, "name": 1, "timezone": 1
    })
    .exec();

  if (meeting.rsvps === group.friends.length + 1) {
    // Check for overlap
    const bookingsOverlap = await helpers.checkBookingsOverlaps(meeting.uid);

    if (bookingsOverlap) {
      
      // Retrieve all emails
      const user = await User
        .findById(group.admin.id)
        .exec();

      const friendsDetails = group.friends.map(friend => {
        let details = {
          email: friend.email,
          timezone: friend.timezone,
          meetingTime: helpers.convertToUserTimezone(bookingsOverlap, friend.timezone)
        };
        return details;
      });

      // Send out emails to everyone with meeting link
      try {
        await Promise.all(
          friendsDetails.map(async (friend) => {
            const res = await emailService.sendMeetingLink(friend.email, friend.timezone, friend.meetingTime);
            return res;
          })
        );
      }
      catch (error) {
        next(error);
      }
    }
    else {
      // Let everyone know nothing is overlapping
      // Reset RSVPs to 0
      meeting.rsvps = 0;
      await meeting.save();

      // Send email to everyone to rebook
    }
  }

  next();
});

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Booking", bookingSchema);