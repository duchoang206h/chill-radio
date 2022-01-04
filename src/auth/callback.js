const { github }  = require('../configs/oauth')
const { JWT_SECRET } = require('../configs/config')

const callback = (req,res) => {
    req.session.displayName = req.user.displayName;
    req.session.img_url = req.user.photos[0].value;
    req.session.email = req.user.email;
    req.session.isLogin = true;
    res.redirect('/')
    }

module.exports = {
    callback
}