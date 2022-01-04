
class SocketService{
    static init(server){
        this.io = require('socket.io')(server);
        return this.io;
    }
    static getIO(){
        return this.io;
    }
}
module.exports = SocketService;