const { github }  = require('../configs/oauth')
const { JWT_SECRET } = require('../configs/config')

const callback = (req,res) => {
    req.session.displayName = req.user.displayName;
    req.session.img_url = req.user.photos[0].value;
    if(!req.user.email){
        req.session.email = req.user.username;
    }else{
        req.session.email = req.user.email;
    }
    req.session.isLogin = true;
    res.redirect('/')
    }

module.exports = {
    callback
}