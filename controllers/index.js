
const jwt = require("jsonwebtoken"); // 
const { JWT_SECRET } = require("../configs/config");
let online_listener = 0;
let list_connected = {}
const io = require('../helpers/socketService').getIO();
const index = async (req, res) => {
  if (!req.cookies.user)
    res.render("index", { img_url: "images/default_avata.png" });
  else {
    try {
      const { name, img_url } = await jwt.verify(req.cookies.user, JWT_SECRET);
      res.render("index", { name: name, img_url: img_url });
    } catch (error) {
      res.render("index", { img_url: "images/default_avata.png" });
    }
  }

  io.on("connection", (socket) => {
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
  }); 
};
module.exports = index;
