const mongose = require('mongoose');
const { Video, sequelize,VideoSchema} = require('./src/video/video.model')
const {  MONGODB_URI } = require('./src/configs/config')
const { VideoService } =require('./src/video/video.service')
const connectBK = mongose.createConnection(MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true});
const VideoBackupModel = connectBK.model('Video',VideoSchema);
const videoService = new VideoService()
async function initDb(){
   await sequelize.sync({force: true})
    const videoInitList = await VideoBackupModel.find({},{_id:0,videoId:1,title:1,duration:1,like:1,dislike:1,addby:1});
    try {
      for(let i=0;i<videoInitList.length;i++){
       const result =  await videoService.create(videoInitList[i].toJSON());
      // console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
    
    console.log("Init db success!");
}
module.exports = { initDb }