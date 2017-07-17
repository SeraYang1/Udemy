var {
	User
} = require('./../models/users')

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
		if (!user) {
			return Promise.reject();
		}
		//modifies the user entered request path
		req.user = user;
		req.token = token;
		next();
	}).catch((e) => {
		//empty body if users token is not authorized
    print("ERROR")
		res.status(401).send();
	})
}

module.exports = {
	authenticate
}
