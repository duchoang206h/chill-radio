const config = require('../configs/config')
const axios = require("axios");
// Fetch List of videoId
const fetchVideoId = async (keyword) => {
  const YTURI_VIDEOID = `https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=20&key=${config.YOUTUBE_KEY}`;
  const ENCODE_YTURI_VIDEOID = encodeURI(YTURI_VIDEOID);
  const data = await axios(ENCODE_YTURI_VIDEOID);
  const response = data.data.items.filter((item) => {
     return item.id.videoId != undefined ; // remove undefined items
  });
  const videoIdList = response.map(v => v.id.videoId)
  return videoIdList;
};
// Fetch information of each videoId in list videoId
const fetchVideoInfor = async (videoId) => {
  const YTURI_TITLE = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=${videoId}&key=${config.YOUTUBE_KEY}`;
  const ENCODE_YTURI_TITLE = encodeURI(YTURI_TITLE);
  const response = await axios.get(ENCODE_YTURI_TITLE);
  let video = {};
   if(!response.data.items[0].status.embeddable) return ; 
  video.title = response.data.items[0].snippet.title;
  // Convert duration from youtube to second Example PT53M27S to 318027s
  const m = response.data.items[0].contentDetails.duration
    .replace(/PT/g, "")
    .replace(/M/g, ",")
    .replace(/S/g, "")
    .split(",");
  video.duration = Number(m[0] * 60) + Number(m[1]);
  if(video.duration>600) return ; 
  video.videoId = videoId;
  return video;
};

const fetchVideo = async (keyword) => {
  const data = await fetchVideoId(keyword);
  const requests = data.map((videoId) => {
    return fetchVideoInfor(videoId).then((result) => {
      return result;
    });
  });
  return Promise.all(requests); // Wait for all promise return result
};
module.exports = fetchVideo;
