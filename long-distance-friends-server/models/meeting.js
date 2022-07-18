const mongoose = require("mongoose");
const helpers = require("../utils/helpers.js");
const Group = require("./group");

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
    rsvps: {
      type: Number,
      min: 0
    },
    uid: {
      type: String,
      default: helpers.genUID
    }
  },
  {
    timestamps: true
  }
);

meetingSchema.pre("deleteOne", { document: true, query: false }, function(next) {
  const meetingId = this._id;
  Group.updateMany({
    $pull: { meetings: meetingId }
  }).exec();
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