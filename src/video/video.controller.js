const MainService = require('../index/main.service');
const { VideoService } = require('./video.service')
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter')
class VideoController {
    constructor(){
      this.MainService = MainService; // One instance for multi router
      this.VideoService = new VideoService() // 
    }
     get = async (req, res) => {
        const currentVideo =  this.MainService.getCurrentVideo();
        res.status(200).json(currentVideo);
      }
    getAll = async (req, res) => {
        const videolist = this.MainService.getPlayList();
        res.status(200).json(videolist);
      }
    post = async (req, res) => {
        if(!req.session.isLogin) return res.status(403).json({msg:"Unauthorized"})
        let addvideo = req.body.video;
        addvideo.title = capitalizeFirstLetter(addvideo.title);
        addvideo.addby = req.session.email.replace('@gmail.com','').replace('@outlook.com','');
        try {
          const newVideo = await this.VideoService.create(addvideo);
          if(newVideo) {
            this.MainService.addvideo(newVideo);
            return res.status(200).json({message:"Success"});
          }else{
            return res.status(403).json({message:"Exist"});
          }
          
        } catch (error) {
          console.log(error);
          return res.status(500).json({message:"Error"});
        }
      }
      emotion= async (req,res)=>{
        const videoId = req.body.videoId;
        const response = await this.MainService.like(videoId);
        res.status(200).json(response)
      }
      put = (req, res) => {
        res.status(404).json({ msg: "Not found" });
      }
      patch = (req, res) => {
        res.status(404).json({ msg: "Not found" });
      }
      delete = (req, res) => {
        res.status(404).json({ msg: "Not found" });
      }
}
module.exports = new VideoController()