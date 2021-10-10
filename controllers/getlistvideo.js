const {Video} = require('../models/Schema');
const Queue = require('../helpers/queue')
class Main {
    constructor(){
        this.queue = new Queue();
        this.time = 0; 
        this.currentVideo = {};
        this.init();
        this.loop();
    }
    async init(){
    await this.checkqueue()
    /* const videoList = await Video.find({}).limit(5); // Get Videos from database 
    console.log(videoList);
    this.queue.init(videoList); */
    this.currentVideo = this.queue.dequeue(); /// 
    this.time = Date.now()/1000;
    }
    async loop(){
        console.log("Loop");
        await this.checkqueue()
        this.videoEnd();
        setTimeout(()=>this.loop(),5000 ) // Check update every 20 minutes
    }
    getCurrentTime(){
        return Date.now()/1000;
    }
    getCurrentVideo(){
        return {
            videoId: this.currentVideo.videoId,
            startAt: this.getCurrentTime() - this.time
        }
    }
    videoEnd(){
        console.log("Check");
        console.log(this.getCurrentTime()-this.time);
        console.log(Number(this.currentVideo.duration));
      if(this.getCurrentTime()-this.time >= Number(this.currentVideo.duration) -5){
          this.currentVideo = this.dequeue(); // 
          this.time = this.getCurrentTime(); // Reset this.time equal to current time 
          return true;
      }
      return false;
    }
    dequeue(){
        return this.queue.dequeue();
    }
    quesesize(){
        return this.queue.size()
    }
    onChange(){
    }
    
    addvideo(Video){
    this.queue.enqueue(Video)
    }
    async checkqueue(){
        console.log("checkqueue ");
        console.log(this.quesesize());
        if(this.quesesize() <=2){
        const videoList = await Video.find({}).limit(5);
        console.log(videoList);
        this.queue.addarray(videoList);
        }
    }
}
module.exports =  Main