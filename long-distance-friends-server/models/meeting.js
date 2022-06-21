const mongoose = require("mongoose");

const windowSchema = new mongoose.Schema({
  startDate: {
    type: mongoose.Schema.Types.Date,
    min: Date.now,
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
        ref: "booking"
      }
    ],
  },
  {
    timestamps: true
  }
);

meetingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Meeting", meetingSchema);