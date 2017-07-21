const moment = require('moment');

var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().format('MMM Do, h:mmA')
	}
}

var generateLocationMessage = (sender, lat, long) => {
	return {
		from: sender,
		url: `http://www.google.com/maps?q=${lat},${long}`,
		createdAt: moment().format('MMM Do, h:mmA')
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}
