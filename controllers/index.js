
const {myEmitter} = require('../helpers/getlistvideo')
let listener = 0;
const jwt = require('jsonwebtoken')
const index = async (req, res) => {
  if(!req.cookies.user) res.render("index");
  else{
   const {name,img_url} =await jwt.verify(req.cookies.user,'ngocmai1202')
   res.render('index',{name:name, img_url: img_url})
  }
    var io = req.app.get("socketio");
    io.on("connection", (socket) => {
        listener++;
        console.log(listener);
        io.emit('new_listener',listener);
    myEmitter.on("video_end",(video)=>{
        console.log("toi io");
        io.emit('new_video',video);
      })
    myEmitter.on("addvideo",(video)=>{
      io.emit('addvideo',video);
    })
    socket.on('disconnect',()=>{
        --listener;
        console.log(listener);
        io.emit('new_listener',listener)
      })
    });
   
  };
  module.exports = index