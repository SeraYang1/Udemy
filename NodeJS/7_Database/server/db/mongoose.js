var mongoose = require('mongoose');

//tells mongoose that were using the built in promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
