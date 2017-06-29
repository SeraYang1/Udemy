// const yargs = require('yargs');
// const geocode = require('./geocoder/geocoder.js')
//
// var argv = yargs
// 	.options({
// 		a: {
// 			describe: 'Address to fetch weather from',
// 			demand: true,
// 			alias: 'address',
// 			string: true
// 		}
// 	})
// 	//lists options that user can call
// 	.help()
// 	.alias('help', 'h')
// 	.argv;
//
// geocode.geocodeAddress(argv.address, (error, results) => {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(JSON.stringify(results, undefined, 2));
// 	}
// });
//
// //dc0f66d65ed468a6581dcfd18379fdb0
const request = require('request')
request({
	url: 'https://api.darksky.net/forecast/dc0f66d65ed468a6581dcfd18379fdb0/37.8267,-122.4233',
	json: true
}, (error, response, body) => {
	if (!error && response.statusCode === 200) {
		console.log(body.currently.temperature)
	} else {
		console.log("Could not fetch weather");
	}
})
