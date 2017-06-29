const yargs = require('yargs');
const geocode = require('./geocoder/geocoder.js')
const weather = require('./weather/weather.js')
const axios = require('axios')

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

var encoded = encodeURIComponent(argv.address)
var codedURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encoded

axios.get(codedURL).then((response) => {
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find that address.');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var long = response.data.results[0].geometry.location.lng;
	var weatherURL = 'https://api.darksky.net/forecast/dc0f66d65ed468a6581dcfd18379fdb0/'+lat+','+long
	console.log(response.data.results[0].formatted_address)
	return axios.get(weatherURL)
}).then((response) => {
	var temp = response.data.currently.temperature;
	var apparentTemp = response.data.currently.apparentTemperature;
	console.log(`It is currently ${temp} but feels like ${apparentTemp}`);
}).catch((e) =>{
	if(e.code === 'ENOTFOUND'){
		console.log('Unable to connect to API services');
	}else{
		console.log(e.message);
	}
})
