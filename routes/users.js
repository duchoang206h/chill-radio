import express from 'express';
import axios from 'axios';
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('scrollspy',{layout:'boostrap'})
});
router.post('/',async (req,res)=>{
const keyword = req.body.searchvideo.toString().trim();
/* request(`https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=10&key=AIzaSyD2f4tGmlAzYzaZK3-RWlInhs2uv4JudMA`,async (error, response, body)=> {
 if(error) throw error // Print the error if one occurred
  const data = response.body;
  const list = JSON.stringify(data)
  console.log(list.etag);
 

}) */
try {
  const resp = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=10&key=AIzaSyD2f4tGmlAzYzaZK3-RWlInhs2uv4JudMA`)
  const data =  resp.data.items;
 res.render('test', { layout:'other',list: data, title: 'Hoang'})
} catch (err) {
  // Handle Error Here
  console.error(err);
}
})
export default router;
