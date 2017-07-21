const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, "../public");
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message')
var dateFormat = require('dateformat');
//first port is for heroku
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

//tells express which file to look at
app.use(express.static(publicPath))

//listens for different calls
io.on('connection', (socket) => {
  console.log('New user connected');

  //socket.emit only sends to one, io.emit sends it to everyone, socket.broadcast.emit sends it to everyone but socket (self)
  socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat!'))

  socket.broadcast.emit('newUser', generateMessage('Admin', 'New user has joined'))

  socket.on('createMessage', (message, callback) => {
    //sends new connect with object
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server');

  })

  socket.on('newLocation', (coords) => {
    io.emit('newLocationLink', generateLocationMessage(coords.sender, coords.lat, coords.long))
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })
})

//sets up server
server.listen(port, () => {
	console.log(`Server is up on port: ${port}`)
});
