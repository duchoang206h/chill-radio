const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar:{
    type: String,
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
});
const User = mongoose.model("User", UserSchema);
module.exports = {
  User
};
