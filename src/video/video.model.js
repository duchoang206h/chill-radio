const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const Video = mongoose.model("Video", VideoSchema);
module.exports = { Video ,VideoSchema}