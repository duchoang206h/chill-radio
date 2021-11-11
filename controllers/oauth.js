const {github} = require('../configs/oauth')
const {JWT_SECRET} = require('../configs/config')
const jwt = require('jsonwebtoken')

const callback = (req,res) => {
    const user = jwt.sign({name:req.user.displayName, img_url:req.user.photos[0].value},JWT_SECRET)
    res.cookie('user',user,{/* httpOnly:true ,*/maxAge:31536000000});
    res.redirect('/')
    }

module.exports = {
    callback
}