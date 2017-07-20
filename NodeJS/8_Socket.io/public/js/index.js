//opens connection to socket that lets us listen
var socket = io();

socket.on('connect', function() {
	console.log('Connected to server')
})

socket.on('disconnect', function() {
	console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
	console.log('MESSAGE: ', message)
  //creates and modified an object
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  jQuery('#msg-list').append(li);
})

socket.on('newUser', function(user) {
  console.log(user)
})

socket.on('newLocationLink', function(msg) {
	var li = jQuery('<li></li>')
	var a = jQuery('<a target="_blank"> My current location </a>')
  li.text(`${msg.from}: `);
	a.attr('href', msg.url);
	li.append(a);
  jQuery('#msg-list').append(li);
})

jQuery('#message-form').on('submit', function(e){
  //e is default behavior, clears text field and adds json object to html
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('#msg').val()
    //callback that server can call to confirm recieving message
  }, (msg) => {
    console.log('got it',msg);
  })
  jQuery('#msg').val('')
})

var locationButton = jQuery('#send-location');
//button, click event, does function
locationButton.on('click', function () {
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.')
	}

	navigator.geolocation.getCurrentPosition(function (position){
		socket.emit('newLocation', {
			sender: 'Admin',
			lat: position.coords.latitude,
			long: position.coords.longitude
		});
	}, function() {
		alert('Permission denied!');
	});
});
