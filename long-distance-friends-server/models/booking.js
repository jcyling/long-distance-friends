const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  date: {
    type: Date,
    min: Date.now
  },
  hours: [String]
});

const bookingSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting"
    },
    booker: {
      type: mongoose.Schema.Types.ObjectId
    },
    availability: [availabilitySchema],
  },
  {
    timestamps: true
  }
);

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Booking", bookingSchema);