const { Video } = require("../models/Schema");
const Queue = require("../helpers/queue");
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();
class Main {
  constructor() {
    this.queue = new Queue();
    this.time = 0;
    this.currentVideo = {};
    this.init();
    this.loop();
  }
  async init() {
    const videoList = await Video.find({}).limit(5); // Get Videos from database 
    console.log(videoList);
    this.queue.addarray(videoList);
    this.currentVideo = this.queue.dequeue(); ///
    this.time = Date.now() / 1000;
  }
  async loop() {
   // console.log("Loop");
    await this.checkqueue();
    this.videoEnd();
    setTimeout(() => this.loop(), 5000); // Check update every 20 minutes
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
    return this.queue.data;
  }
  videoEnd() {
   // console.log("Check");
   // console.log(this.getCurrentTime() - this.time);
   // console.log(Number(this.currentVideo.duration));
    if (this.getCurrentTime() - this.time >= Number(this.currentVideo.duration) - 5) {
      this.currentVideo = this.dequeue(); //
      this.time = this.getCurrentTime();
      this.emitNewVideo() // Reset this.time equal to current time
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
  emitNewVideo() {
    const newvideo = this.getCurrentVideo()

    myEmitter.emit('video_end',newvideo)
    console.log("video_end");
  }
  async addvideo(video) {
    this.queue.enqueue(video);
    myEmitter.emit('addvideo',video);
    console.log(video);
  }
  async checkqueue() {
   // console.log("checkqueue ");
   // console.log(this.quesesize());
    if (this.quesesize() <= 2) {
      const videoList = await Video.find({}).limit(5);
    //  console.log(videoList);
      this.queue.addarray(videoList);
    }
  }
}
module.exports = {Main,myEmitter};
