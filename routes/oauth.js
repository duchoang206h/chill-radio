const router = require('express').Router();
const {githubController} = require('../controllers/oauth')
/* router.post('/login/oauth/facebook',)
router.post('/login/oauth/google',) */
router.post('/login/github',githubController.getCode)
/* router.post('/login/oauth/microsoft',)
router.post('/callback/facebook',)
router.post('/callback/google',) */
router.get('/callback/github',githubController.getAccess_token)
/* router.post('/callback/microsoft',) */

module.exports = router