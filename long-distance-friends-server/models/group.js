const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  friends: [
    {
      name: String,
      timezone: String,
      lat: String,
      lng: String,
    }
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;