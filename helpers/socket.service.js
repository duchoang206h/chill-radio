const socketio = require('socket.io')
class sockerService{
    constructor(server){
        this.io = socketio(server)
    }
}
module.exports = sockerService