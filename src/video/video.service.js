const { Video } = require("./video.model");

 
class VideoService {

  constructor() {
    this.Video = Video;
  }
  async findOne(videoId) {
    try {
      const result = await this.Video.findOne({ videoId: videoId });
      return result;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  async create(video) {
    try {
      const result = await this.Video.find({ videoId: video.videoId });
      if (!result.length) {
        const newVideo = new this.Video(video);
        await newVideo.save();
        return newVideo;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async findMany(number){
      try {
          const result = await this.Video.find({},{ _id: 0,videoId: 1,duration: 1,title: 1,addby: 1,like: 1,dislike: 1,},{limit:number});
          return result;
      } catch (error) {
          console.log(error);
          return [];
      }  
  }
  async updateLike(videoId, like){
        try {
            await this.Video.updateOne({videoId:videoId},{$set:{like: like}});
            return true;
        } catch (error) {
            return false;
        }
  }
  async updateDislike(videoId, dislike){
    try {
        await this.Video.updateOne({videoId:videoId},{$set:{dislike: dislike}});
        return true;
    } catch (error) {
        return false;
    }
  }
  async delete(videoId){
    try {
        await this.Video.deleteOne({videoId:videoId});
        return true;
    } catch (error) {
        return false;
    }
  }
  async deleteMany(email){
    try {
        await this.Video.deleteMany({addby:email})
        return true;
    } catch (error) {
        return false;
    }
  }
  /**
   * 
   * @param {{ mostLike?: Boolean, mostDislike?:Boolean,
   *  limit: Number, skip?: Number}} filler 
   */
  async findByFiller(filler){
    const countVideo = this.count(); // Amount of video record in db
    let fillerObj ={};
    if(filler.limit) {
      fillerObj.limit = filler.limit
    }
    if(filler.skip){
      if(filler.skip < countVideo){
        fillerObj.skip = filler.skip
      }
      else if(filler.skip == countVideo){
        fillerObj.skip = 0;
      }else{
        fillerObj.skip = filler.skip - countVideo;
      }
    }
    if(filler.mostLike){
      fillerObj.sort = {};
      fillerObj.sort.like = 1;
    }
    if(filler.mostLike){
      if(fillerObj.sort){
        fillerObj.sort.dislike = 1;
      }else{
        fillerObj.sort = {};
        fillerObj.sort.dislike = 1;
      }
    }
    try {
      const result = await this.Video.find({},{ _id: 0},fillerObj);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async count(){
    try {
      const count = await this.Video.count();
      return count;
    } catch (error) {
      console.log(error);
    }
    
  }
}
module.exports = { VideoService };