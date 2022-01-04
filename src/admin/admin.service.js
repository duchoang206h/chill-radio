const {VideoService} = require('../video/video.service')
const { BlackList } =  require('./blacklist.model')
const { Admin } = require('./admin.model')
const speakeasy = require('speakeasy')
const { TWOFA_SECRET, BCRYPT_SECRET } = require('../configs/config');
const bcrypt = require('bcryptjs');
class AdminService {
    constructor(){
        this.Admin = Admin
        this.VideoService = new VideoService();
    }
    login = async (admin) =>{
       
        try {
        const result = await this.Admin.find({email: admin.email})
        if(result.length == 0 ){
            return false;
        }
        const isPassword = await bcrypt.compareSync(admin.password,result[0].toJSON().password)
        if(!isPassword) return false;
        return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    twofa = (token) => {
        return speakeasy.totp.verify({
            secret: TWOFA_SECRET,
            encoding: 'ascii',
            token: token
        })
    }
    async banUser(email){
        this.VideoService.deleteMany(email); // Delete all video add by user (email);
        try {
            let newBannedUser = new BlackList(email); // Add email to blacklist
            await newBannedUser.save();
            return true; 
        } catch (error) {
            return false;
        }
    }
    async deleteVideo(videoId){
        try {
            await this.VideoService.delete(videoId);
            return true;
        } catch (error) {
            return false;
        }
    }
    
}
module.exports = { AdminService }

