const express =  require('express');
const router = express.Router();
const apicontroller = require('../controllers/apicontroller')
router.post('/search', apicontroller.search);
router.post('/addvideo', apicontroller.addvideo);
module.exports = router;
