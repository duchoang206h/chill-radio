const { VideoService } = require('../video/video.service')
const Queue = require('../utils/queue')
const io = require('../socket/socket.service').getIO();
const delay = require('delay')
class MainService {
  constructor() {
    this.io = io;
    this.VideoService = new VideoService();
    this.skip = 0; // to skip n record
    this.queue = new Queue();
    this.time = 0;
    this.currentVideo = {};
    this.init();
    this.loop();
  }
  async init() {
    await delay(3000);
    const videoList = await this.VideoService.findByFiller({limit: 20, skip: this.skip, mostLike: true});
    this.skip += 20;
    this.queue.addarray(videoList); // Init video list to queue
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
  getPlayList() {
    return [this.currentVideo, ...this.queue.data];
  }
  videoEnd() {
    if (
      this.getCurrentTime() - this.time >=
      Number(this.currentVideo.duration) - 5
    ) {
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
  emitNewVideo() {
    const newvideo = this.getCurrentVideo();
    this.io.emit("new_video", newvideo);
  }
  async addvideo(video) {
    this.queue.enqueue(video);
    this.io.emit("addvideo", video);
  }
  async checkqueue() {
    if (this.quesesize() <= 10) {
      const videoList = await this.VideoService.findByFiller({skip: this.skip, limit: 20, mostLike: true});
      this.skip += 20;
      this.queue.addarray(videoList);
      this.io.emit("addvideo", videoList);
      if(this.skip > this.VideoService.count()) this.skip = this.VideoService.count(); // reset skip when skip gt total video record
    }
  }

  like(videoId) {
    if (videoId == this.currentVideo.videoId) {
      this.VideoService.updateLike(videoId,++this.currentVideo.like);
      return this.currentVideo;
    } else {
      const video = this.queue.data.find((v) => (v.videoId == videoId));
      if (!video) return;
      else {
        this.VideoService.updateLike(videoId,++video.like);
        return video;
      }
    }
  }
  unlike(videoId) {
    if (videoId == this.currentVideo.videoId) {
      this.VideoService.updateLike(videoId, --this.currentVideo.like);
      return this.currentVideo;
    } else {
      const video = this.queue.data.find((v) => (v.videoId == videoId));
      if (!video) return;
      else {
        this.VideoService.updateLike(videoId,--video.like);
        return video;
      }
    }
  }
  dislike(videoId) {
    if (videoId == this.currentVideo.videoId) {
      this.VideoService.updateDislike(videoId, ++this.currentVideo.dislike);
      return this.currentVideo;
    } else {
      const video = this.queue.data.find((v) => (v.videoId == videoId));
      if (!video) return;
      else {
        this.VideoService.updateDislike(videoId,++video.dislike);
        return video;
      }
    }
  }
   undislike(videoId) {
    if (videoId == this.currentVideo.videoId) {
      this.VideoService.updateDislike(videoId, --this.currentVideo.dislike);
      return this.currentVideo;
    } else {
      const video = this.queue.data.find((v) => (v.videoId == videoId));
      if (!video) return;
      else {
        this.VideoService.updateDislike(videoId, --video.dislike);
        return video;
      }
    }
  }
}
module.exports = new MainService();
