const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlackListSchema = new Schema({
 email:{
     type: String,
     required: true,
 },
 duration:{
    type: String,
    default: 'permanent'
 }
});

const BlackList = mongoose.model("BlackList", BlackListSchema);
module.exports = { BlackList }
