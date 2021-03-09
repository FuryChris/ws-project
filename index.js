var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

const io = require('socket.io')(server);



app.use(express.static('client'));

server.listen(PORT, function() {
  console.log('Chat server running');
});

const users = {}

io.on('connection', socket => {
  socket.on('message', msg => {
    socket.broadcast.emit('message', { msg: msg, name: users[socket.id]});
    socket.emit('messageSelf', { msg: msg, name: users[socket.id]});
  });
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
});