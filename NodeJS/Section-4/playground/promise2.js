const request = require('request');

var geocodeAddress = (address) => {

	return new Promise((resolve, reject) => {
		var encoded = encodeURIComponent(address)
		request({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encoded,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject("Could not connect to google servers");
			} else if (body.status === "ZERO_RESULTS") {
				reject("Address does not exist");
			} else if (body.status === "OK") {
				resolve({
					location: body.results[0].formatted_address,
					lat: body.results[0].geometry.location.lat,
					long: body.results[0].geometry.location.lng
				})
			} else {
				reject("Could not connect to google servers")
			}
		})
	});
}

geocodeAddress('00000').then((success) => {
	console.log(JSON.stringify(success, undefined, 2));
}, (error) => {
	console.log(error);
})
