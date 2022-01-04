const { VideoSchema } = require('./src/video/video.model');
const { CronJob } = require('cron');
const mongose = require('mongoose');
const connectDB = mongose.createConnection('mongodb://127.0.0.1:27017/radiochill', {useNewUrlParser: true,useUnifiedTopology: true})
const connectBK = mongose.createConnection('mongodb+srv://duchoang206h:120202@cluster0.zhldv.mongodb.net/chillradio?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
const VideoDB = connectDB.model('Video',VideoSchema)
const VideoBackupModel = connectBK.model('Video',VideoSchema);
const previousVideoCount = 0;
const backup = async () =>{
    try {
        const result = await VideoDB.find({},{_id:0,__v:0},{ skip:previousVideoCount });
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