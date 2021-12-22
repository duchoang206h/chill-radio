const {github} = require('../configs/oauth')
const {JWT_SECRET} = require('../configs/config')
const jwt = require('jsonwebtoken')

const callback = (req,res) => {
    req.session.displayName = req.user.displayName;
    req.session.img_url = req.user.photos[0].value;
    req.session.email = req.user.email;
    req.session.isLogin = true;
    /* const user = jwt.sign({name:req.user.displayName, img_url:req.user.photos[0].value,email:req.user.email},JWT_SECRET)
    res.cookie('user',user,{maxAge:31536000000}); */
    res.redirect('/')
    }

module.exports = {
    callback
}