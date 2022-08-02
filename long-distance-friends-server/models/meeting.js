const mongoose = require("mongoose");
const helpers = require("../utils/helpers.js");
const Booking = require("./booking");

const windowSchema = new mongoose.Schema({
  startDate: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  endDate: {
    type: mongoose.Schema.Types.Date,
    min: Date.now,
    required: true
  },
  timezone: {
    type: String
  }
});

const meetingSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    window: windowSchema,
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
      }
    ],
    uid: {
      type: String,
      default: helpers.genUID
    }
  },
  {
    timestamps: true
  }
);

meetingSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  const Group = require("./group");
  const meetingId = this._id;

  Group.updateOne(
    { meeting: meetingId },
    {
      $pull: { meetings: meetingId }
    }
  ).exec();
  Booking.deleteMany({ meeting: meetingId }).exec();
  next();
});

meetingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Meeting", meetingSchema);