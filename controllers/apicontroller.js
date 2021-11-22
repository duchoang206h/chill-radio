const getVideoInfor = require("../helpers/getVideoInfor");
const { Video } = require("../models/Schema");
const { Main } =  require('../controllers/Main')
const { JWT_SECRET } = require('../configs/config')
const jwt = require('jsonwebtoken')
const main = new Main()
const searchController = {
  post: async (req, res) => {
    const keyword = req.body.keyword.toString().replace(/ /g, "+"); // Replace keyword space by +
    try {
      const response = await getVideoInfor(keyword);
      return res.status(200).json(response);
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
    const videolist =  main.getPlayList();
    res.status(200).json(videolist);
  },
  post: async (req, res) => {
    const user = req.cookies.user;
    const {email} = jwt.verify(user,JWT_SECRET)
    let addvideo = req.body.video;
    console.log(email);
    addvideo.addby = email.replace('@gmail.com','');
    console.log("chech add video ");
      console.log(addvideo);
    const newVideo = new Video(addvideo);
    try {
      const response = await newVideo.save();
      main.addvideo(addvideo);
      return res.status(200).json(response.message);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message | error);
    }
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
