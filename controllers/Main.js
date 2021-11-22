const { Video } = require("../models/Schema");
const Queue = require("../helpers/queue");
const SocketService = require('../helpers/socketService')
class Main {
  constructor() {
    this.skip = 0 // to skip n record 
    this.queue = new Queue();
    this.time = 0;
    this.currentVideo = {};
    this.init();
    this.loop();
  }
  async init() {
    const videoList = await Video.find({},{_id: 0,videoId:1,duration:1,title:1,addby:1}).skip().limit(10); // Get Videos from database 
    this.queue.addarray(videoList);
    this.currentVideo = this.queue.dequeue(); ///
    this.time = Date.now() / 1000;
  }
  async loop() {
    await this.checkqueue();
    this.videoEnd();
    setTimeout(() => this.loop(), 5000); 
  }
  getCurrentTime() {
    return Date.now() / 1000;
  }
  getCurrentVideo() {
    return {
      videoId: this.currentVideo.videoId,
      startAt: this.getCurrentTime() - this.time,
    };
  }
  getPlayList(){
    return [this.currentVideo,...this.queue.data];
  }
  videoEnd() {
    if (this.getCurrentTime() - this.time >= Number(this.currentVideo.duration) - 5) {
      this.currentVideo = this.dequeue(); 
      this.time = this.getCurrentTime();
      this.emitNewVideo();
      return true;
    }
    return false;
  }
  dequeue() {
    return this.queue.dequeue();
  }
  quesesize() {
    return this.queue.size();
  }
  emitNewVideo(){
    const newvideo = this.getCurrentVideo()
    SocketService.ioEmit('new_video',newvideo)
  }
  async addvideo(video) {
    this.queue.enqueue(video);
   SocketService.ioEmit('addvideo',video)
  }
  async checkqueue() {
    if (this.quesesize() <= 10) {
      const videoList = await Video.find({},{_id: 0,videoId:1,duration:1,title:1,addby:1}).limit(20);
      this.queue.addarray(videoList);
    }
  }
  update(videoId){
    const video = this.queue.data.find(v =>v.videoId = videoId);
    ++ video.like;
    Video.updateOne({videoId: videoId},{$set:{like: video.like}}).exec((err,data)=>{
      
    })
  }
}
module.exports = {Main};
