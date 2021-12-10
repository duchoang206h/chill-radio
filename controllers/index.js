
const jwt = require("jsonwebtoken"); // 
const { JWT_SECRET } = require("../configs/config");
const io = require('../helpers/socketService').getIO();
const main = require('./Main')
let online_listener = 0;
let list_connected = {}
const index = async (req, res) => {
  console.log(req.session.like);
  
  
  if (!req.cookies.user)
    res.render("index", { img_url: "images/default_avata.png", online:online_listener });
  else {
    try {
      const { name, img_url } = await jwt.verify(req.cookies.user, JWT_SECRET);
      res.render("index", { name: name, img_url: img_url, online:online_listener  });
    } catch (error) {
      res.render("index", { img_url: "images/default_avata.png" , online:online_listener });
    }
  }
  io.on("connection", (socket) => {
  let arrayVideoLike = [];
  let arrayVideoDislike = [];
   console.log(socket.handshake.session);
   if(socket.handshake.session.like){
    for(let video in socket.handshake.session.like){
      if(socket.handshake.session.like[video] == true) arrayVideoLike.push(video);
    }
    console.log("arrayVideoLike",arrayVideoLike);
    socket.emit('initLikeVideo',arrayVideoLike);
    }
    if(socket.handshake.session.dislike){
      for(let video in socket.handshake.session.dislike){
        if(socket.handshake.session.dislike[video] == true) arrayVideoDislike.push(video);
      }
      socket.emit('initDislikeVideo',arrayVideoDislike);
    }
      if(!list_connected[socket.handshake.address]) {
        list_connected[socket.handshake.address] = true;
        online_listener++;
        io.emit('new_listener',online_listener)
      }
      socket.on('disconnect',()=>{
        if(list_connected[socket.handshake.address]) {
          list_connected[socket.handshake.address] = false;
          online_listener--;
          io.emit('new_listener',online_listener)
        }
      })
      socket.on('like_video', (videoId)=>{
          if(socket.handshake.session.like == undefined){
              console.log("session undefined");
              socket.handshake.session.like = {};
              socket.handshake.session.like[`${videoId}`] = true;
              socket.handshake.session.save();
              const data =  main.like(videoId);
              io.emit('like_video',data)
          }
          else{
            if(socket.handshake.session.like[`${videoId}`] == undefined|| socket.handshake.session.like[`${videoId}`] == false) {
              console.log("NNNNNNNNNNNN");
              socket.handshake.session.like[`${videoId}`] = true;
              socket.handshake.session.save();
              const data =  main.like(videoId);
              io.emit('like_video',data)
          }
          } 
          console.log("session",socket.handshake.session.like);
    })
    socket.on('unlike_video',videoId=>{
      if(socket.handshake.session.like[`${videoId}`] == true){
        socket.handshake.session.like[`${videoId}`] = false;
        socket.handshake.session.save();
        const data =  main.unlike(videoId);
        io.emit('like_video',data)
      }
    })
    socket.on('dislike_video',(videoId)=>{
      console.log("session",socket.handshake.session.dislike);
        if(socket.handshake.session.dislike == undefined){
            socket.handshake.session.dislike = {};
            socket.handshake.session.dislike[`${videoId}`] = true;
            socket.handshake.session.save();
            console.log(socket.handshake.session.dislike);
            const data =  main.dislike(videoId);
            console.log(data);
            io.emit('dislike_video',data)
        }
        else if(socket.handshake.session.dislike[`${videoId}`] == undefined|| socket.handshake.session.dislike[`${videoId}`] == false) {
            socket.handshake.session.dislike[`${videoId}`] = true;
            socket.handshake.session.save();
            const data =  main.dislike(videoId);
            io.emit('dislike_video',data);
        }
  })
  socket.on('undislike_video',videoId=>{
    console.log("UNDISLIKE");
    if(socket.handshake.session.dislike[`${videoId}`] == true){
      socket.handshake.session.dislike[`${videoId}`] = false;
      socket.handshake.session.save();
      const data =  main.undislike(videoId);
      io.emit('dislike_video',data)
    }
  })

    });
};
module.exports = index;
