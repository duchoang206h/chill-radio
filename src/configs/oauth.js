const { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID, GOOGLE_SECRET, GITHUB_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_SECRET} = require('./config')
const github = {
    client_id: GITHUB_CLIENT_ID,
    client_secret:GITHUB_SECRET,
}
const google={
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_SECRET
}
const facebook = {
    client_id: FACEBOOK_CLIENT_ID,
    client_secret: FACEBOOK_SECRET
}
















module.exports = {
    github,google,facebook
}