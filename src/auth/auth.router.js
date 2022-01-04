const router = require('express').Router();
const { callback } = require("./callback");
const passport = require('./passport')
// router.post('/auth/login/oauth/facebook',)
router.post('/auth/login/google',passport.authenticate('google', { scope: ['email','profile','openid'] })) 
router.post('/auth/login/github',passport.authenticate('github', { scope: ['user:email'] }))
/* router.post('/auth/login/oauth/microsoft',)*/
router.post('/auth/login/facebook', passport.authenticate('facebook'))
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),callback) 
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),callback)
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),callback)
/* router.post('/callback/microsoft',) */

module.exports = router