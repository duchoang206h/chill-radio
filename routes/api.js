const express =  require('express');
const router = express.Router();
const apicontroller = require('../controllers/apicontroller')
const Main = require('../controllers/getlistvideo');
let g = new Main();
router.post('/search', apicontroller.search);
router.get('/getCurrentVideo', (req,res)=>{
    const currentVideo =  g.getCurrentVideo();
    console.log(currentVideo);
    res.status(200).json(currentVideo);
  
});
module.exports = router;
