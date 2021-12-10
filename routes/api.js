const router =  require('express').Router();
const {searchController,videoController} = require('../controllers/apicontroller')
// Route /api/v1/search
router.get('/search', searchController.get);
router.post('/search',searchController.post);
router.put('/search',searchController.put );
router.delete('/search',searchController.delete );
// Route /api/v1/video
router.get('/video',videoController.get);
router.get('/video/all',videoController.getAll);
router.post('/video', videoController.post);
router.put('/video', videoController.put);
router.delete('/video', videoController.delete);
router.post('/video/emotion',videoController.emotion );

module.exports = router;

