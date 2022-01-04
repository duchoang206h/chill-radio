const { AdminService } = require('./admin.service')
const { VideoService } = require('../video/video.service')
const { adminLoginSchema } = require('../middlewares/validateRequest')
class AdminController{
    constructor(){
        this.AdminService = new AdminService();
        this.VideoService = new VideoService();
    }
    getAdmin(req,res){
        res.render('adminlogin',{ layout:'admin'})
    }
    login = async ( req ,res) => {
        try {
           /*  console.log(req.body); */
            const { value, error} = await adminLoginSchema.validate({email: req.body.email, password: req.body.password});
            console.log("value",value);
            if(error) return res.status(401).json({msg:'Missing email or password'});
            const result = await this.AdminService.login(value);
            console.log("aaaaaa",result);
            if(!result) return res.status(401).json({msg:'Wrong email or password'});
            req.session.adminloginByPassword = true;
            return res.redirect('/admin/twofa');
        } catch (error) {
            console.log(error);
            return res.status(401).json({msg:'Error'})
        }
    }
     gettwofa = (req,res) =>{
        if(!req.session.adminloginByPassword) return res.status(401).json({mgs:"Error"});
        return res.render('admintwofa',{layout:'admin'})
     }
     twofa = async (req ,res) =>{
        try {
            if(!req.session.adminloginByPassword) return res.status(401).json({mgs:"Error"});
            const result = this.AdminService.twofa(req.body.token);
            console.log(req.body.token,result);
            if(!result) return res.status(401).json({mgs:"Error"});
            req.session.isAdmin = true;
            return res.redirect('/dashboard',{layout:'admin'})
        } catch (error) {
            return res.status(401).json({mgs:"Error"});
        }
    }
    getDashboard = async ( req, res) => {
        if(!req.session.isAdmin) return res.status(403).json({msg:"Unauthorized"});
        const result = await this.VideoService.findByFiller({mostDislike: true, limit: 10});
        const videoList = result.map(v =>v.toJSON());
        console.log("tesstt",result[0].videoId);
        return res.render('dashboard',{ layout:'admin', video : videoList})
    }
    postDashboard = async (req,res) => {
        if(!req.session.isAdmin) return res.status(403).json({msg:"Unauthorized"});
        const result = await this.VideoService.findByFiller({mostDislike: true, limit: 10});
        return res.render('dashboard',{ layout:'admin',video : result})
    }
}
module.exports = new AdminController()