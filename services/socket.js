let io;

exports.initSocketIO = (server) => {
    io = require('socket.io')(server)
    return io
}

exports.getSocketIO = () => {
    if (!io) {
        console.log('socket.io is not initialized')
        process.exit(1)
    }
    return io
}