const express =  require('express');
const router = express.Router();
const apicontroller = require('../controllers/apicontroller')
const Main = require('../controllers/getlistvideo');
let g = new Main();
// Route /api/v1/search
router.get('/search', apicontroller.search.get);
router.post('/search',apicontroller.search.post);
router.put('/search',apicontroller.search.put );
router.delete('/search',apicontroller.search.delete );
// Route /api/v1/video
router.get('/video', (req,res)=>{
    const currentVideo =  g.getCurrentVideo();
    console.log(currentVideo);
    res.status(200).json(currentVideo);
  
});
router.post('/video', (req,res)=>{
  res.status(200).json({msg:"Chua code xong"})
});
router.put('/video', (req,res)=>{
    res.status(200).json({msg:"Chua code xong"})
  });
router.delete('/video', (req,res)=>{
    res.status(200).json({msg:"Chua code xong"})
  });
module.exports = router;

