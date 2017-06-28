const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=7126%20clarendon%20street',
  json: true
}, (error, response, body) => {
  console.log(body)
});
