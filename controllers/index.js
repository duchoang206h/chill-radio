const {myEmitter} = require('../helpers/getlistvideo')
let listener = 0;
const index = (req, res) => {
    res.render("index");
    var io = req.app.get("socketio");
    io.on("connection", (socket) => {
        listener++;
        console.log(listener);
        io.emit('new_listener',listener);
    myEmitter.on("video_end",(video)=>{
        console.log("toi io");
        io.emit('new_video',video);
      })
    socket.on('disconnect',()=>{
        listener--;
        console.log(listener);
        io.emit('new_listener',listener)
      })
    });
   
  };
  module.exports = index