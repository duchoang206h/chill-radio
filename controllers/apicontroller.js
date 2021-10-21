const getVideoInfor = require("../helpers/getVideoInfor");
const { Video } = require("../models/Schema");
const {Main} =  require('../helpers/getlistvideo')
const main = new Main()
const search = {
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
const video = {
  get: async (req, res) => {
    const currentVideo =  main.getCurrentVideo();
    res.status(200).json(currentVideo);
  },
  getAll: async (req, res) => {
    const videolist =  main.getPlayList();
    res.status(200).json(videolist);
  },
  post: async (req, res) => {
    const newVideo = new Video(req.body.video);
    try {
      const response = await newVideo.save();
      return res.status(200).json(response.message);
    } catch (error) {
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
  search,
  video
};
