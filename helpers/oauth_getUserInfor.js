const axios = require('axios')

const oauth_github = async (access_token)=>{
const response = await axios({
    method:'get',
    url:"https://api.github.com/user",
    headers:{
        Authorization: "token " + access_token,
    }
})
return {
    name:response.data.name,
    img_url:response.data.avatar_url,
}
}
module.exports = {
    oauth_github
}