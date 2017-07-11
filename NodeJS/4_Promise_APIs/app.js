const yargs = require('yargs');
const geocode = require('./geocoder/geocoder.js')
const weather = require('./weather/weather.js')

var argv = yargs
	.options({
		a: {
			describe: 'Address to fetch weather from',
			demand: true,
			alias: 'address',
			string: true
		}
	})
	//lists options that user can call
	.help()
	.alias('help', 'h')
	.argv;

geocode.geocodeAddress(argv.address, (error, results) => {
	if (error) {
		console.log(error);
	} else {
		console.log(results.location);
		weather.getWeather(results.lat, results.long, (error, results) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`It is currently ${results.temp} but feels like ${results.apparentTemp}`);
			}
		})
	}
});
