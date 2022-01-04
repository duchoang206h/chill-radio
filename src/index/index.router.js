const router = require('express').Router();
const indexController = require('./index.controller')
router.get('/',indexController.getIndex);
module.exports = router;