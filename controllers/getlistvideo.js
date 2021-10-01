const {Video} = require('../models/Schema');
const Queue = require('../helpers/queue')
class Main {
    constructor(){
        this. queue = new Queue();
        this.init();
        this.loop();
    }
    init(){
    const videoList = await Video.aggregate([{},{$project:{_id:0, date:0}},{$limit: 20},{$sort:{date: 1}}]);
    this.queue.init(videoList);
    }
    onChange(){
    }
    loop(){
        checkqueue();
        setTimeout(()=>this.loop(), 20*60) // Check update every 20 minutes
    }
    addvideo(Video){
    this.queue.enqueue(Video)
    }
    checkqueue(){
        if(this.queue.size <=5){
        const videoList = await Video.aggregate([{},{$project:{_id:0, date:0}},{$limit: 10},{$sort:{date: 1}}]);
        this.queue.addarray(videoList);
        }
    }
}
module.exports = Main