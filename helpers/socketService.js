
class SocketService{
    constructor(){
        this.io = null;
    }
    initialize(server){
        this.io = require("socket.io")(server);
    }
    getIO(){
        return this.io;
    }
    socketOn(event,handle){
        this.io.on('connection',socket=>{
            socket.on(event,handle)
        });
    }
    ioEmit(event, data){
         this.io.emit(event,data)
    }
    socketEmit(event, data){
        this.io.on('connection',socket=>{
            socket.emit(event,data)
        });
    }
}

module.exports = new SocketService();