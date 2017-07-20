var dateFormat = require('dateformat');

var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
	}
}

var generateLocationMessage = (sender, lat, long) => {
	return {
    from: sender,
		url: `http://www.google.com/maps?q=${lat},${long}`,
		createdAt: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}
