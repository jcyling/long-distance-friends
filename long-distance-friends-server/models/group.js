const mongoose = require("mongoose");
const User = require("./user");
const Meeting = require("./meeting");
const Booking = require("./booking");
const Friend = require("./friend");

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

groupSchema.pre("deleteOne", { document: true, query: false }, function(next) {
  const groupId = this._id;
  User.updateMany({ $pull: { groups: groupId } }).exec();
  Booking.deleteMany({ group: groupId }).exec();
  Meeting.deleteMany({ group: groupId }).exec();
  Friend.deleteMany({ group: groupId }).exec();
  next();
});

groupSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Group", groupSchema);