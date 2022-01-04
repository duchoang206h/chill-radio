const router =  require('express').Router();
const VideoController = require('./video.controller')
router.get('/api/v1/video',VideoController.get);
router.get('/api/v1/video/all',VideoController.getAll);
router.post('/api/v1/video', VideoController.post);
router.put('/api/v1/video', VideoController.put);
router.delete('/api/v1/video', VideoController.delete);
router.post('/api/v1/video/emotion',VideoController.emotion );
module.exports = router;