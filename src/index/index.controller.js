const io = require("../socket/socket.service").getIO();
const MainService = require("./main.service");

class MainController {
  constructor() {
    this.online_listener = 0;
    this.list_connected  = {}; // Check multi connection socket io when refresh tab multi time
  }
   getIndex = async (req, res) => {
    if (!req.session.isLogin)
      res.render("index", {
        img_url: "images/default_avatar.png",
        online: this.online_listener,
      });
    else {
      res.render("index", {
        name: req.session.displayName,
        img_url: req.session.img_url,
        online: this.online_listener,
      });
    }
    io.on("connection", (socket) => {
      let arrayVideoLike = [];
      let arrayVideoDislike = [];
      if (socket.handshake.session.like) {
        for (let video in socket.handshake.session.like) {
          console.log("LIKEEEEEEEEEEEEEEEE");
          if (socket.handshake.session.like[video] == true)
            arrayVideoLike.push(video);
        }
       setTimeout(() => {
        socket.emit("initLikeVideo", arrayVideoLike);
       }, 1000);
      }
      if (socket.handshake.session.dislike) {
        for (let video in socket.handshake.session.dislike) {
          if (socket.handshake.session.dislike[video] == true)
            arrayVideoDislike.push(video);
        }
        setTimeout(() => {
          socket.emit("initDislikeVideo", arrayVideoDislike);
        }, 1000);
      }
      if (!this.list_connected [socket.handshake.address]) {
        this.list_connected [socket.handshake.address] = true;
        this.online_listener++;
        io.emit("new_listener", this.online_listener);
      }
      socket.on("disconnect", () => {
        if (this.list_connected [socket.handshake.address]) {
          this.list_connected [socket.handshake.address] = false;
          this.online_listener--;
          io.emit("new_listener", this.online_listener);
        }
      });
      socket.on("checkLogin", () => {
        if (req.session.isLogin) {
          socket.emit("checkLogin", true);
        } else {
          socket.emit("checkLogin", false);
        }
      });
      socket.on("like_video", (videoId) => {
        if (socket.handshake.session.like == undefined) {
          console.log("session undefined");
          socket.handshake.session.like = {};
          socket.handshake.session.like[`${videoId}`] = true;
          socket.handshake.session.save();
          const data = MainService.like(videoId);
          io.emit("like_video", data);
        } else {
          if (
            socket.handshake.session.like[`${videoId}`] == undefined ||
            socket.handshake.session.like[`${videoId}`] == false
          ) {
            socket.handshake.session.like[`${videoId}`] = true;
            socket.handshake.session.save();
            const data = MainService.like(videoId);
            io.emit("like_video", data);
          }
        }
      });
      socket.on("unlike_video", (videoId) => {
        if (socket.handshake.session.like[`${videoId}`] == true) {
          socket.handshake.session.like[`${videoId}`] = false;
          socket.handshake.session.save();
          const data = MainService.unlike(videoId);
          io.emit("like_video", data);
        }
      });
      socket.on("dislike_video", (videoId) => {
        if (socket.handshake.session.dislike == undefined) {
          socket.handshake.session.dislike = {};
          socket.handshake.session.dislike[`${videoId}`] = true;
          socket.handshake.session.save();
          const data = MainService.dislike(videoId);
          io.emit("dislike_video", data);
        } else if (
          socket.handshake.session.dislike[`${videoId}`] == undefined ||
          socket.handshake.session.dislike[`${videoId}`] == false
        ) {
          socket.handshake.session.dislike[`${videoId}`] = true;
          socket.handshake.session.save();
          const data = MainService.dislike(videoId);
          io.emit("dislike_video", data);
        }
      });
      socket.on("undislike_video", (videoId) => {
        if (socket.handshake.session.dislike[`${videoId}`] == true) {
          socket.handshake.session.dislike[`${videoId}`] = false;
          socket.handshake.session.save();
          const data = MainService.undislike(videoId);
          io.emit("dislike_video", data);
        }
      });
    });
  }
}
module.exports = new MainController();