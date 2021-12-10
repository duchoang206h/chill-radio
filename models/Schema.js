const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const VideoSchema = new Schema({
  videoId: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true, 
  },
  title: {
    type: String,
  },
  addby: {
    type: String,
  },
  like:{
    type:Number,
    default:0,
  },
  dislike:{
    type:Number,
    default:0,
  }
});

const User = mongoose.model("User", UserSchema);
const Video = mongoose.model("Video", VideoSchema);
module.exports = {
  User,
  Video,
};
