const mongoose = require("mongoose");
const validator = require("validator");

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  timezone: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true
  }
});

friendSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Friend", friendSchema);