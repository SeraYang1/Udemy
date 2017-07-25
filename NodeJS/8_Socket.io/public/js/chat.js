//opens connection to socket that lets us listen
var socket = io();

//reformat the bottom messages sender
var w = $('#messages').width();
$('.chat__footer').width(w);
var space = $('.chat__sidebar').width();
$('.chat__footer').css('margin-left', space+'px')
var footerHeight = $('.chat__footer').innerHeight();
$('#messages').css('margin-bottom', footerHeight+'px')


$( window ).resize(function() {
	var w = $('#messages').width();
	$('.chat__footer').width(w);
	var space = $('.chat__sidebar').width();
	$('.chat__footer').css('margin-left', space+'px')
	if ($(".chat__sidebar").css('display') === 'none') {
	   $('.chat__footer').css('margin-left', '0px')
	}
});

if ($(".chat__sidebar").css('display') === 'none') {
   $('.chat__footer').css('margin-left', '0px')
}

function scrollToBottom() {
	//selectors
	var messages = jQuery('#messages')
	var newMessage = messages.children('li:last-child')
	//heights
	var clientHeight = messages.prop('clientHeight')
	var scrollTop = messages.prop('scrollTop')
	var scrollHeight = messages.prop('scrollHeight')
	var newMessageHeight = newMessage.innerHeight()
	var lastMessageHeight = newMessage.prev().innerHeight()

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight)
	}
}

socket.on('updateUserList', function (users) {
	var ol = jQuery('<ol></ol>');

	users.forEach(function(user) {
		ol.append(jQuery('<ol></ol>').text(user))
	})

	jQuery('#users').html(ol);
})

socket.on('connect', function() {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function (err) {
		if(err){
			alert(err);
			//sends the user back to the index page, window.location.href sets current page
			window.location.href = '/';
		} else {
			console.log('no error')
		}
	})
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
	scrollToBottom()
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
	scrollToBottom()
})

socket.on('newLocationLink', function(msg) {
	var template = jQuery('#loc-template').html();
	var html = Mustache.render(template, {
		url: msg.url,
		from: msg.from,
		createdAt: msg.createdAt
	});
	jQuery('#messages').append(html);
	scrollToBottom()
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
