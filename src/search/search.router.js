const SearchController = require('./search.controller')
const router = require('express').Router()
router.get('/api/v1/search', SearchController.get);
router.post('/api/v1/search',SearchController.post);
module.exports = router