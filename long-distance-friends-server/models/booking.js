const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  },
  booker: {
    type: mongoose.Schema.Types.ObjectId
  },
  availableDays: {
    type: mongoose.Schema.Type.Mixed
  },
});

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Group", bookingSchema);