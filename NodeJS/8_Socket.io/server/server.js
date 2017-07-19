const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, "../public");
const socketIO = require('socket.io');
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

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })
})

//sets up server
server.listen(port, () => {
	console.log(`Server is up on port: ${port}`)
});
