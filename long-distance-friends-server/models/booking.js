const mongoose = require("mongoose");
const axios = require("axios");
const helpers = require("../utils/helpers");
const emailService = require("../services/emailService");
const zoomService = require("../services/zoomService");

const baseUrl = "http://localhost:3001/api";

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
      $pull: { bookings: bookingId }
    }
  ).exec();
  next();
});

bookingSchema.post("save", async function (booking, next) {
  const Group = require("./group");
  const Meeting = require("./meeting");

  // Update meeting to increment booking count
  const meeting = await Meeting
    .findById(booking.meeting)
    .exec();
  meeting.bookings = meeting.bookings.concat(booking._id);
  await meeting.save();

  // Compare bookings with number of members
  const group = await Group
    .findById(booking.group)
    .populate("friends")
    .populate("admin", {
      "username": 1, "name": 1, "timezone": 1, "email": 1
    })
    .exec();

  if (meeting.bookings.length === group.friends.length + 1) {
    // Check for overlap
    const bookingsOverlap = await helpers.checkBookingsOverlaps(meeting.uid);

    const userDetails = {
      name: group.admin.name,
      email: group.admin.email,
      timezone: group.admin.timezone,
    };

    if (bookingsOverlap) {
      userDetails.localMeetingTime = helpers.convertToUserTimezone(bookingsOverlap, group.admin.timezone);
    }

    const friendsDetails = group.friends.map(friend => {
      let details = {
        name: friend.name,
        email: friend.email,
        timezone: friend.timezone,
      };
      if (bookingsOverlap) {
        details.localMeetingTime = helpers.convertToUserTimezone(bookingsOverlap, friend.timezone);
      }
      return details;
    });

    const groupMembersDetails = friendsDetails.concat(userDetails);

    // If bookings do overlap
    if (bookingsOverlap) {
      // Create zoom link
      const zoomLink = await zoomService.createZoomMeeting(bookingsOverlap);

      // Send out emails to everyone with meeting link
      try {
        await Promise.all(
          groupMembersDetails.map(async (friend) => {
            const res = await emailService.sendMeetingLink(friend.name, friend.email, friend.timezone, friend.localMeetingTime, zoomLink);
            return res;
          })
        );
      }
      catch (error) {
        next(error);
      }
    }
    else {
      // Delete all bookings for this meeting
      const bookingIds = meeting.bookings.map(booking => booking.toString());

      try {
        await Promise.all(
          bookingIds.map(async (id) => {
            const res = await axios.delete(`${baseUrl}/bookings/${id}`);
            return res;
          })
        );

        // Send email to everyone to rebook
        await Promise.all(
          groupMembersDetails.map(async (friend) => {
            const res = await emailService.sendRebookLink(friend.email, `http://localhost:3000/rsvp/${meeting.uid}`);
            return res;
          })
        );

      }
      catch (error) {
        console.log(error);
      }
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