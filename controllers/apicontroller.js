const getVideoInfor = require("../helpers/getVideoInfor");
const { Video } = require("../models/Schema");
const search = {
  post: async (req, res) => {
    const keyword = req.body.keyword.toString().replace(/ /g, "+"); // Replace keyword space by +
    console.log(keyword);
    try {
      const response = await getVideoInfor(keyword);
      console.log(response);
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
  get: async (req, res) => {},
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
  video,
};
