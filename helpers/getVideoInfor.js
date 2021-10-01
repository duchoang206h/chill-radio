require('dotenv').config();
const YOUTUBE_KEY = process.env.YOUTUBE_KEY
const axios = require('axios');
// Fetch List of videoId
const fetchVideoId   = async (keyword) => {
const YTURI_VIDEOID  = `https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=10&key=AIzaSyD2f4tGmlAzYzaZK3-RWlInhs2uv4JudMA`;
const ENCODE_YTURI_VIDEOID = encodeURI(YTURI_VIDEOID)
    const data = await axios(ENCODE_YTURI_VIDEOID) 
    let response = data.data.items.map(item=> {return item.id.videoId})
   return response;
  }
// Fetch information of each videoId in list videoId 
const fetchVideoInfor = async (videoId) =>{
    const YTURI_TITLE = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=AIzaSyD2f4tGmlAzYzaZK3-RWlInhs2uv4JudMA`
    const ENCODE_YTURI_TITLE = encodeURI(YTURI_TITLE)
    const response = await axios.get(ENCODE_YTURI_TITLE);
    let video = {};
    video.title = response.data.items[0].snippet.title;
    video.videoId = videoId;
    return video; 
}

const fetchVideo = async (keyword) => {
     const data = await fetchVideoId(keyword);
    const requests = data.map((videoId) => {
      return fetchVideoInfor(videoId) 
       .then((a) => {
        return a 
        })
    })
    return Promise.all(requests) // Wait for all promise return result 
}
module.exports = fetchVideo