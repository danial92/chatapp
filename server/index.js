const io = require('socket.io')(3000);
const users = {}

io.on('connection', socket => {
    socket.on('joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('has-joined', name)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('disconnected', users[socket.id] )
        delete users[socket.id]
    })
})
