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
const { DATABASE_URL } = require('../configs/config')
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(DATABASE_URL, { logging: false , dialectOptions:{ ssl: {
  require: true, // This will help you. But you will see nwe error
  rejectUnauthorized: false // This line will fix new error
}}});

const Video = sequelize.define('Videos',{
  videoId:{
    type:DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique:true
},
title:{
    type: DataTypes.STRING,
    allowNull:false,
},
duration:{
    type:DataTypes.INTEGER,
    allowNull:false,
},
addby:{
    type: DataTypes.STRING,
},
like:{
    type:DataTypes.INTEGER,
    defaultValue: 0
},
dislike:{
    type:DataTypes.INTEGER,
    defaultValue: 0
}
})
module.exports = { Video , sequelize, VideoSchema}