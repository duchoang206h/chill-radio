const express = require('express');
var router = express.Router();
require('dotenv').config();
const YOUTUBE_KEY = process.env.YOUTUBE_KEY
const axios =require('axios')
// Function to fetch Github info of a user.


const fetchVideoId = async (keyword) => {
const YTURI_VIDEOID  = `https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=10&key=AIzaSyDiqU4vPycF8KBCcwCxpgb4Qwidtiqbb-Y`;
const ENCODE_YTURI_VIDEOID = encodeURI(YTURI_VIDEOID)
    const data = await axios(ENCODE_YTURI_VIDEOID) // API call to get user info from Github.
    
    let response = data.data.items.map(item=> {return item.id.videoId})
   // console.log(response);
   return response;
  }
const fetchVideoInfor = async (videoId) =>{
    const YTURI_TITLE = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=AIzaSyD2f4tGmlAzYzaZK3-RWlInhs2uv4JudMA`
    const ENCODE_YTURI_TITLE = encodeURI(YTURI_TITLE)
    const response = await axios.get(ENCODE_YTURI_TITLE);
    let video = {};
    video.title = response.data.items[0].snippet.title;
    video.videoId = videoId;
    return video;
   
    
}
  // Iterates all users and returns their Github info.
  const fetchVideo = async (keyword) => {
     const data = await fetchVideoId(keyword);
    const requests = data.map((videoId) => {
      return fetchVideoInfor(videoId) // Async function that fetches the user info.
       .then((a) => {
        return a // Returns the user info.
        })
    })
    return Promise.all(requests) // Waiting for all the requests to get resolved.
  }
  
  
  


router.post('/video', async (req, res, next) =>{
  // Replace keyword space by +
 const keyword = req.body.keyword.toString().replace(/ /g,'+');
try {
  const response = await fetchVideo(keyword);
  console.log(response);
  return res.status(200).json(response);
} catch (error) {
  return res.status(500).json([])
}

});

module.exports = router;
