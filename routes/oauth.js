const router = require('express').Router();
const {callback} = require('../controllers/oauth')
const passport = require('../middlewares/passport')
// router.post('/login/oauth/facebook',)
router.post('/login/google',passport.authenticate('google', { scope: ['email','profile','openid'] })) 
router.post('/login/github',passport.authenticate('github', { scope: ['user:email'] }))
/* router.post('/login/oauth/microsoft',)*/
router.post('/login/facebook', passport.authenticate('facebook'))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),callback) 
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),callback)
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),callback)
/* router.post('/callback/microsoft',) */

module.exports = router