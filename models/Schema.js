const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});
const VideoSchema = new Schema({
    videoId :{
        type: String,
        required:true,
        unique: true
    },
    duration:{
        type: String,
        required:true
    },
    title:{
        type: String
    },
    addby:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date
})

const User = mongoose.model('User', UserSchema);
const Video =  mongoose.model('Video', UserSchema);
module.exports = {
    User,Video
}