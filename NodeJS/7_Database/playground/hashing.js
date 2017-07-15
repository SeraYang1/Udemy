const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
//
// var message = '3'
// //hashs the message to become encrypted
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`)
// console.log(`Hashed: ${hash}`)

//concept is JWT (jason web token)
var data = {
	id: 4
}
//encryps the data
var token = jwt.sign(data, 'secret')
console.log(token)
//tries to decode the token with the secret
var decoded = jwt.verify(token, 'secret')
console.log(decoded)

// var token = {
// 	data,
// 	//by adding in a secret, we will know if an outsider tried to modify the data
// 	hash: SHA256(JSON.stringify(data) + "secret").toString()
// }
//
// //if someone else tries to modify the data, the encryption will not have the secret added on to it that only the server knows
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();
//
// console.log(resultHash)
// console.log(token.hash)
