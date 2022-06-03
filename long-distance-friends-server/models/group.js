const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  friends: [
    {
      name: String,
      timezone: String,
      lat: String,
      lng: String,
    }
  ],
});

groupSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Group", groupSchema);