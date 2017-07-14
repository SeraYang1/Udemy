var mongoose = require('mongoose');

//tells mongoose that were using the built in promises
mongoose.Promise = global.Promise;
//uses the heroku database if it can
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
}
