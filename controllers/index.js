const io = require("../helpers/socketService").getIO();
const main = require("./Main");
let online_listener = 0; 
let list_connected = {}; // Check multi connection socket io when refresh tab multi time
const index = async (req, res) => {
  if (!req.session.isLogin)
    res.render("index", {
      img_url: "images/default_avata.png",
      online: online_listener,
    });
  else {
    res.render("index", {
      name: req.session.displayName,
      img_url: req.session.img_url,
      online: online_listener,
    });
  }
  io.on("connection", (socket) => {
    let arrayVideoLike = [];
    let arrayVideoDislike = [];
    if (socket.handshake.session.like) { 
      for (let video in socket.handshake.session.like) {
        if (socket.handshake.session.like[video] == true)
          arrayVideoLike.push(video);
      }
      socket.emit("initLikeVideo", arrayVideoLike);
    }
    if (socket.handshake.session.dislike) {
      for (let video in socket.handshake.session.dislike) {
        if (socket.handshake.session.dislike[video] == true)
          arrayVideoDislike.push(video);
      }
      socket.emit("initDislikeVideo", arrayVideoDislike);
    }
    if (!list_connected[socket.handshake.address]) {
      list_connected[socket.handshake.address] = true;
      online_listener++;
      io.emit("new_listener", online_listener);
    }
    socket.on("disconnect", () => {
      if (list_connected[socket.handshake.address]) {
        list_connected[socket.handshake.address] = false;
        online_listener--;
        io.emit("new_listener", online_listener);
      }
    });
    socket.on('checkLogin',()=>{
      if(req.session.isLogin){
        socket.emit('checkLogin', true);
      }else{
        socket.emit('checkLogin', false);
      }
    })
    socket.on("like_video", (videoId) => {
      if (socket.handshake.session.like == undefined) {
        console.log("session undefined");
        socket.handshake.session.like = {};
        socket.handshake.session.like[`${videoId}`] = true;
        socket.handshake.session.save();
        const data = main.like(videoId);
        io.emit("like_video", data);
      } else {
        if (
          socket.handshake.session.like[`${videoId}`] == undefined ||
          socket.handshake.session.like[`${videoId}`] == false
        ) {
          socket.handshake.session.like[`${videoId}`] = true;
          socket.handshake.session.save();
          const data = main.like(videoId);
          io.emit("like_video", data);
        }
      }
    });
    socket.on("unlike_video", (videoId) => {
      if (socket.handshake.session.like[`${videoId}`] == true) {
        socket.handshake.session.like[`${videoId}`] = false;
        socket.handshake.session.save();
        const data = main.unlike(videoId);
        io.emit("like_video", data);
      }
    });
    socket.on("dislike_video", (videoId) => {
      if (socket.handshake.session.dislike == undefined) {
        socket.handshake.session.dislike = {};
        socket.handshake.session.dislike[`${videoId}`] = true;
        socket.handshake.session.save();
        const data = main.dislike(videoId);
        io.emit("dislike_video", data);
      } else if (
        socket.handshake.session.dislike[`${videoId}`] == undefined ||
        socket.handshake.session.dislike[`${videoId}`] == false
      ) {
        socket.handshake.session.dislike[`${videoId}`] = true;
        socket.handshake.session.save();
        const data = main.dislike(videoId);
        io.emit("dislike_video", data);
      }
    });
    socket.on("undislike_video", (videoId) => {
      if (socket.handshake.session.dislike[`${videoId}`] == true) {
        socket.handshake.session.dislike[`${videoId}`] = false;
        socket.handshake.session.save();
        const data = main.undislike(videoId);
        io.emit("dislike_video", data);
      }
    });
  });
};
module.exports = index;
