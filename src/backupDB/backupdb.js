const { VideoSchema } = require('../video/video.model');
const {VideoService} = require('../video/video.service')
const videoService = new VideoService();
const { CronJob } = require('cron');
const mongose = require('mongoose');
const connectBK = mongose.createConnection('mongodb+srv://duchoang206h:120202@cluster0.zhldv.mongodb.net/chillradio?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
const VideoBackupModel = connectBK.model('Video',VideoSchema);
const previousVideoCount = 0;
const backup = async () =>{
    try {
        const result = await videoService.findByFiller({skip:previousVideoCount})
        const previousVideoCount = result.length;
        await VideoBackupModel.insertMany(result);
    } catch (error) { 
        console.log(error);
    }
}
const job = new CronJob('00 00 00 * * *',()=>{
    backup();
} );
job.start();