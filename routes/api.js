const router =  require('express').Router();
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
router.post('/video', apicontroller.video.post);
router.put('/video', apicontroller.video.put);
router.delete('/video', apicontroller.video.delete);
module.exports = router;

