
const listVideo = [{
  videoId: "VaExN-H5vCc",
  duration: 195,
  title: "LEMON TREE ANIMATION WITH LYRICS",
  addby: "HOÀNG ĐỨC",
  like: 13,
  dislike: 0
},{
  videoId: "e9oxsf3NWMs",
  duration: 245,
  title: "[VietSub+Effect] Until You -  Shayne Ward",
  addby: "HOÀNG ĐỨC",
  like: 14,
  dislike: 0
},{
  videoId: "F5tS5m86bOI",
  duration: 262,
  title: "LẠ LÙNG / Vũ. (Original)",
  addby: "HOÀNG ĐỨC",
  like: 0,
  dislike: 0
},{
  videoId: "ixdSsW5n2rI",
  duration: 337,
  title: "BƯỚC QUA NHAU / Vũ. (Official MV)",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},{
  videoId: "Vdm6i1m4tDE",
  duration: 303,
  title: "Bước Qua Nhau / Vũ. (Live Session trên tàu Cát Linh - Hà Đông)",
  addby: "duchoang206h",
  like: 1,
  dislike: 0
},{
  videoId: "Zzn9-ATB9aU",
  duration: 322,
  title: "Nàng Thơ | Hoàng Dũng | Official MV",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},{
  videoId: "QXMpQKQ4xsQ",
  duration: 251,
  title: "Đông Kiếm Em - Vũ | Lyrics MV",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},{
  videoId: "JGwWNGJdvx8",
  duration: 264,
  title: "Ed Sheeran - Shape of You (Official Music Video)",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},{
  videoId: "YfDqONbzYPc",
  duration: 250,
  title: "Shayne Ward - Until You (audio)",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},
{
  videoId: "V5GS5ANG96M",
  duration: 233,
  title: "3107 - W/n ( Official Video ) ft. Nâu, Duongg",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},
{
  videoId: "i_hdxA_SSyo",
  duration: 287,
  title: "Phố Không Em | Thai Dinh | Official Audio | 2016",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},
{
  videoId: "ECxVfrwwTp0",
  duration: 307,
  title: "Gác lại âu lo - Da LAB ft. Miu Lê (Official MV)",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
},
{
  videoId: "vVhKA9Av6vA",
  duration: 300,
  title: "'bao tiền một mớ bình yên?' - 14 Casper & Bon (Official)",
  addby: "duchoang206h",
  like: 0,
  dislike: 0
}
]
const { VideoService } =require('./src/video/video.service')
const { Video, sequelize} = require('./src/video/video.model')
const videoService = new VideoService()
async function initDb(){
   await sequelize.sync({force: true})
    for( let i = 0;i<listVideo.length;i++){
    await videoService.create(listVideo[i]);
    }
    console.log("Init db success!");
}

module.exports = { initDb }