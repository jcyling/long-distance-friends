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
    window: [windowSchema],
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking"
    },
  },
  {
    timestamps: true
  }
);

// meetingSchema.pre("deleteMany", function(next) {
//   const meeting = this;
//   meeting.model("Group").deleteOne({ meetings: meeting._id }, next);
// });

meetingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Meeting", meetingSchema);