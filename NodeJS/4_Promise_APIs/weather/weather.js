const request = require('request')

var getWeather = (lat, long, callback) => {
	request({
		url: 'https://api.darksky.net/forecast/dc0f66d65ed468a6581dcfd18379fdb0/'+lat+','+long,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined,{
        temp: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      })
		} else {
			callback("Could not fetch weather");
		}
	})
};

module.exports = {
  getWeather
}
