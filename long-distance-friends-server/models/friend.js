const mongoose = require("mongoose");
const Booking = require("./booking");

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  timezone: {
    type: String
  },
  offset: {
    type: String
  },
  latlng: {
    type: [Number],
    index: "2dsphere"
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
    sparse: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } }
    }
  }
});

friendSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  const Group = require("./group");
  const friendId = this._id;
  Group.updateMany({
    $pull: { friends: friendId }
  }).exec();
  Booking.deleteMany({ booker: friendId }).exec();
  next();
});

friendSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.email;
  }
});

module.exports = mongoose.model("Friend", friendSchema);

