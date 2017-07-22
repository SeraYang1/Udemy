//opens connection to socket that lets us listen
var socket = io();

socket.on('connect', function() {
	console.log('Connected to server')
})

socket.on('disconnect', function() {
	console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
	var template = jQuery('#msg-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: message.createdAt
	});
	jQuery('#messages').append(html);
  // //creates and modified an object
  // var li = jQuery('<li></li>')
  // li.text(`${message.from}: ${message.text}`)
	// var time = jQuery(`<p id="time"> ${message.createdAt} </p>`)
	// li.append(time)
  // jQuery('#messages').append(li);
})

socket.on('newUser', function(user) {
	var template = jQuery('#msg-template').html();
	var html = Mustache.render(template, {
		text: user.text,
		from: user.from,
		createdAt: user.createdAt
	});
	jQuery('#messages').append(html);
})

socket.on('newLocationLink', function(msg) {
	var template = jQuery('#loc-template').html();
	var html = Mustache.render(template, {
		url: msg.url,
		from: msg.from,
		createdAt: msg.createdAt
	});
	jQuery('#messages').append(html);
	// var li = jQuery('<li></li>')
	// var a = jQuery('<a target="_blank"> My current location </a>')
  // li.text(`${msg.from}: `);
	// a.attr('href', msg.url);
	// li.append(a);
	// var time = jQuery(`<p id="time"> ${msg.createdAt} </p>`)
	// li.append(time)
  // jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
  //e is default behavior, clears text field and adds json object to html
  e.preventDefault();

	var msgBox = jQuery('#message');

  socket.emit('createMessage', {
    from: 'User',
    text: msgBox.val()
    //callback that server can call to confirm recieving message
  }, (msg) => {
	  msgBox.val('')
  })
})

var locationButton = jQuery('#send-location');
//button, click event, does function
locationButton.on('click', function () {
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.')
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position){
		locationButton.removeAttr('disabled').text('Send Location')
		socket.emit('newLocation', {
			sender: 'Admin',
			lat: position.coords.latitude,
			long: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send Location')
		alert('Permission denied!');
	});
});
