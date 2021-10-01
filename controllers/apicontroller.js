const getVideoInfor = require('../helpers/getVideoInfor')
const {Video} = require('../models/Schema')
module.exports = {
  search : async (req, res) =>{
    const keyword = req.body.keyword.toString().replace(/ /g,'+'); // Replace keyword space by +
     try {
        const response = await getVideoInfor(keyword);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error.message);
        return res.status(500).json([])
      }
    },
  addvideo: async (req, res) =>{
    const newVideo = new Video(req.body.video)
     try {
        const response = await newVideo.save();
        return res.status(200).json(response.message);
      } catch (error) {
        return res.status(500).json(error.message|error)
      }
    },
};