const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    }
  ]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model("User", userSchema);