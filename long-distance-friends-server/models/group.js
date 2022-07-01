const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend"
    }
  ],
  meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting"
    }
  ]
});

groupSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Group", groupSchema);