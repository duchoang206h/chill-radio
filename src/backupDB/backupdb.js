const { VideoSchema } = require('../video/video.model');
const {VideoService} = require('../video/video.service')
const videoService = new VideoService();
const { CronJob } = require('cron');
const mongose = require('mongoose');
const connectBK = mongose.createConnection('mongodb+srv://duchoang206h:120202@cluster0.zhldv.mongodb.net/chillradio?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
const VideoBackupModel = connectBK.model('Video',VideoSchema);
const backup = async () =>{
    try {
        const result = await videoService.findAll();
        for(let i =0;i<result.length;i++){
           const response = await VideoBackupModel.findOne({videoId:result[i].videoId});
           if(!response) VideoBackupModel.create(result[i]);
           else{
               VideoBackupModel.updateOne({videoId:result[i]},{like:result[i].like,dislike:result[i].dislike})
           }
        }
    } catch (error) { 
        console.log(error);
    }
}
const job = new CronJob('00 00 00 * * *',()=>{
    backup();
} );
job.start();