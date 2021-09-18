import express from 'express';
var router = express.Router();
import axios from 'axios'
/* GET home page. */
/* async function getTitle(videoId){
   
    return response.data.items[0].snippet.title;
} */
router.post('/video', async (req, res, next) =>{
 const keyword = req.body.keyword.toString().replace(/ /g,'+');
 console.log(keyword)
let videolist = [];
const YTURI_VIDEOID  = `https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=10&key=AIzaSyDiqU4vPycF8KBCcwCxpgb4Qwidtiqbb-Y`;
const ENCODE_YTURI_VIDEOID = encodeURI(YTURI_VIDEOID)
const data = await axios.get(ENCODE_YTURI_VIDEOID);
data.data.items.forEach(async (item) => {
    let video = {};
    const YTURI_TITLE = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${item.id.videoId}&key=AIzaSyD2f4tGmlAzYzaZK3-RWlInhs2uv4JudMA`
    const ENCODE_YTURI_TITLE = encodeURI(YTURI_TITLE)
    const response = await axios.get(ENCODE_YTURI_TITLE);
    video.title = response.data.items[0].snippet.title;
    video.videoId = item.id.videoId;
    videolist.push(video);
});
setTimeout(()=>{res.json(videolist);},305)
 
});

export default router;
