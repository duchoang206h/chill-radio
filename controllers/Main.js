const { Video } = require("../models/Schema");
const Queue = require("../helpers/queue");
/* const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter(); */
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
    const videoList = await Video.find({},{_id: 0,videoId:1,duration:1,title:1}).skip().limit(10); // Get Videos from database 
    console.log(videoList);
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
    console.log(this.queue.data);
    return [this.currentVideo,...this.queue.getAllData()];
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
    //myEmitter.emit('video_end',newvideo)
    SocketService.ioEmit('new_video',newvideo)
    console.log("new_video",newvideo );
  }
  async addvideo(video) {
    this.queue.enqueue(video);
   // myEmitter.emit('addvideo',video);
   SocketService.ioEmit('addvideo',video)
    console.log(video);
  }
  async checkqueue() {
    if (this.quesesize() <= 10) {
      const videoList = await Video.find({},{_id: 0,videoId:1,duration:1,title:1}).limit(10);
      this.queue.addarray(videoList);
    }
  }
}
module.exports = {Main};
