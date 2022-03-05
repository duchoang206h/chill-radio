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

/* const mongoose = require("mongoose");
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
module.exports = { Video }
 */
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Video = sequelize.define('Videos',{
  videoId:{
    type:DataTypes.STRING,
    allowNull: false,
    primaryKey: true
},
title:{
    type: DataTypes.STRING,
    allowNull:false,
},
duration:{
    type:DataTypes.NUMBER,
    allowNull:false,
},
addby:{
    type: DataTypes.STRING,
},
like:{
    type:DataTypes.NUMBER,
    defaultValue: 0
},
dislike:{
    type:DataTypes.NUMBER,
    defaultValue: 0
}
})
module.exports = { Video ,sequelize, VideoSchema}