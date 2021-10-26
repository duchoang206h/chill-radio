const {github} = require('../configs/oauth')
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
    res.redirect(`/?oauth=github&access_token=${access_token}`)
    }
}
module.exports = {
    githubController,

}