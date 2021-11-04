const {github} = require('../configs/oauth')
const {oauth_github} = require('../helpers/oauth_getUserInfor')

const jwt = require('jsonwebtoken')
const axios =require('axios')
const githubController = {
    getCode:(req,res)=>{
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${github.client_id}&redirect_url=${github.redirect_uri}`)
    },
    getAccess_token :async (req,res )=>{
    const {code} =req.query;
    const response = await axios({
        method:"post",
        url:"https://github.com/login/oauth/access_token",
        params:{
            client_id:github.client_id,
            client_secret:github.client_secret,
            code:code
        },
        headers:{
            Accept: 'application/json'
        }
    })
    console.log(response.data);
    const access_token = response.data.access_token;
    const {name,img_url} = await oauth_github(access_token);
    const user = await jwt.sign({name:name,img_url:img_url},"ngocmai1202",{expiresIn:31536000});
    res.cookie('user',user,{/* httpOnly:true */maxAge:31536000000});
    res.redirect('/')
    }
}

module.exports = {
    githubController,

}