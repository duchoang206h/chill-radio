const getVideoInfor = require("../helpers/getVideoInfor");
const capitalizeFirstLetter = require('../helpers/capitalizeFirstLetter')
const { Video } = require("../models/Schema");
const main =  require('../controllers/Main')
const searchController = {
  post: async (req, res) => {
    const keyword = req.body.keyword.toString().replace(/ /g, "+"); // Replace keyword space by +
    try {
      const response = await getVideoInfor(keyword);
      const videoList = response.filter(v =>v);
      return res.status(200).json(videoList);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json([]);
    }
  },
  get: (req, res) => {
    res.status(404).json({ msg: "Not found" });
  },
  put: (req, res) => {
    res.status(404).json({ msg: "Not found" });
  },
  patch: (req, res) => {
    res.status(404).json({ msg: "Not found" });
  },
  delete: (req, res) => {
    res.status(404).json({ msg: "Not found" });
  },
};
const videoController = {
  get: async (req, res) => {
    const currentVideo =  main.getCurrentVideo();
    res.status(200).json(currentVideo);
  },
  getAll: async (req, res) => {
    const videolist = main.getPlayList();
    res.status(200).json(videolist);
  },
  post: async (req, res) => {
  
    const userEmail = req.session.email;
    let addvideo = req.body.video;
    addvideo.title = capitalizeFirstLetter(addvideo.title);
    addvideo.addby = userEmail.replace('@gmail.com','').replace('@outlook.com',''); 
    const newVideo = new Video(addvideo);
    try {
      const result = await Video.find({videoId:newVideo.videoId});
      console.log(newVideo);
      console.log(result);
      if(result.length === 0) {
        console.log("da them");
        newVideo.save();
        main.addvideo(newVideo);
        return res.status(200).json({message:"Success"});
      }else{
        return res.status(403).json({message:"Exist"});
      }
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Error"});
    }
  },
  emotion: async (req,res)=>{
    const videoId = req.body.videoId;
    const response = await main.like(videoId);
    res.status(200).json(response)
  },
  put: (req, res) => {
    res.status(404).json({ msg: "Not found" });
  },
  patch: (req, res) => {
    res.status(404).json({ msg: "Not found" });
  },
  delete: (req, res) => {
    res.status(404).json({ msg: "Not found" });
  },
};
module.exports = {
  searchController,
  videoController
};
