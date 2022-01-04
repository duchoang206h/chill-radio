const { BlackList} = require('../admin/blacklist.model')
class CheckUser {
    async checkValidUser(req,res,next){
        if(req.session.email) {
            const result = await BlackList.find(req.session.email);
            if(result.length!=0){
                return res.status(403).json({msg:"Bạn bị ban vĩnh viễn :)))"});
            }
            return next();
        }
    }
}
module.exports = new CheckUser();