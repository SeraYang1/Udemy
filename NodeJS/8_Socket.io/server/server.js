const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, "../public");
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {User} = require('./utils/users')
var dateFormat = require('dateformat');
//first port is for heroku
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);
var users = new User();
//tells express which file to look at
app.use(express.static(publicPath))

//listens for different calls
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name)){
      callback('Name is required')
    }
    if(!isRealString(params.room)){
      callback('Room is required')
    }

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    //io.to('place').emit socket.broadcast.to('place').emit only sends message to people in place room
    //socket.emit only sends to one, io.emit sends it to everyone, socket.broadcast.emit sends it to everyone but socket (self)
    socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat!'))

    socket.broadcast.to(params.room).emit('newUser', generateMessage('Admin', `${params.name} has joined!`))

    callback()
  })



  socket.on('createMessage', (message, callback) => {
    //sends new connect with object
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server');

  })

  socket.on('newLocation', (coords) => {
    io.emit('newLocationLink', generateLocationMessage(coords.sender, coords.lat, coords.long))
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id)
    io.to(user.room).emit('updateUserList', users.getUserList(user.room))
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`))
    console.log('Disconnected from server')
  })
})

//sets up server
server.listen(port, () => {
	console.log(`Server is up on port: ${port}`)
});
