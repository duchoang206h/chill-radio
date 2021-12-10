const io = require('../helpers/socketService').getIO();
const main = require('./Main')
let online_listener = 0;
let list_connected = {}
io.on("connection", (socket) => {
  console.log(list_connected);
  console.log(socket.handshake.address);
    if(list_connected[socket.handshake.address] == undefined) {
      list_connected[socket.handshake.address] = { online: true };
      online_listener++;
      io.emit('new_listener',online_listener)
    }
    else if(list_connected[socket.handshake.address]['online'] == false){
      list_connected[socket.handshake.address]['online'] == true;
      online_listener++;
      io.emit('new_listener',online_listener)
    }
    socket.on('disconnect',()=>{
      if(list_connected[socket.handshake.address] !=undefined) {
        list_connected[socket.handshake.address]['online'] = false;
        online_listener--;
        io.emit('new_listener',online_listener)
      }
    })
    socket.on('like_video',async (videoId)=>{
      console.log("dang oSocketIo",videoId);
        if(list_connected[socket.handshake.address]["like"]== undefined){
            list_connected[socket.handshake.address]["like"] = [videoId]
            
            const data = await main.like(videoId);
        }else{
          const video = list_connected[socket.handshake.address]["like"].find(v=>v == videoId);
          if(!video) {
            list_connected[socket.handshake.address]["like"].push(videoId)
            const data = await main.like(videoId);
          }else{
            const data = await main.unlike(videoId);
          }
        }
    })
  });