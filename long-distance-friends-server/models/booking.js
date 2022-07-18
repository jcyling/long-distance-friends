const mongoose = require("mongoose");
const Meeting = require("./meeting");

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
  const bookingId = this._id;
  Meeting.updateOne(
    { bookings: bookingId },
    {
      $inc: { rsvps: -1 },
      $pull: { bookings: bookingId }
    }
  ).exec();
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