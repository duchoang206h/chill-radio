const { Video } = require("./video.model");

 
class VideoService {

  constructor() {
    this.Video = Video;
  }
  async findOne(videoId) {
    try {

      //const result = await this.Video.findOne({ videoId: videoId });
      const result = await this.Video.findOne({
        where:{videoId: videoId},
        attributes:['videoId','title','duration','addby','like','dislike']
      })
      return result.dataValues;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  async create(video) {
    try {
      ///const result = await this.Video.find({ videoId: video.videoId });
      const result = await this.Video.create(video);
    //  console.log(result.toJSON());
     return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async findMany(number){
      try {
         // const result = await this.Video.find({},{ _id: 0,videoId: 1,duration: 1,title: 1,addby: 1,like: 1,dislike: 1,},{limit:number});
          let result = await this.Video.findAll({
          attributes:['videoId','duration','title','addby','like','dislike'],
          limit:number,
         })
          result = result.map(v =>v.dataValues)
          return result;
      } catch (error) {
          console.log(error);
          return [];
      }  
  }
  async updateLike(videoId, like){
        try {
           // await this.Video.updateOne({videoId:videoId},{$set:{like: like}});
           await this.Video.update({like:like},{
             where:{
               videoId:videoId
             }
           })
            return true;
        } catch (error) {
            return false;
        }
  }
  async updateDislike(videoId, dislike){
    try {
        //await this.Video.updateOne({videoId:videoId},{$set:{dislike: dislike}});
        await this.Video.update({dislike:dislike},{
          where:{
            videoId:videoId
          }
        })
        return true;
    } catch (error) {
        return false;
    }
  }
  async delete(videoId){
    try {
      //  await this.Video.deleteOne({videoId:videoId});
      await this.Video.destroy({
        where: {
          videoId: videoId
        }
      });
        return true;
    } catch (error) {
        return false;
    }
  }
  async deleteMany(email){
    try {
       // await this.Video.deleteMany({addby:email})
       await this.Video.destroy({
        where: {
          addby: email
        }
      });
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
    /* const countVideo = this.count(); // Amount of video record in db
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
    } */
    if(filler.skip) {
      const count = await this.Video.count();
      if(filler.skip>= count) {
        filler.skip %= count;
      }
    }
    let sortResult = [];
    if(filler?.mostLike) sortResult.push(['like','DESC']);
    if(filler?.mostLike) sortResult.push(['dislike','DESC'])
    try {
      //const result = await this.Video.find({},{ _id: 0},fillerObj);
      let result =  await this.Video.findAll({
        attributes:['videoId','duration','title','addby','like','dislike'],
        limit:filler.limit,
        offset:filler?.skip,
        order:sortResult
      })
      result = result.map(v =>v.dataValues)
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