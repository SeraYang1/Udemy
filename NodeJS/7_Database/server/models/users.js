var mongoose = require('mongoose');

var User = mongoose.model('User', {
  //each of these are a new attribute with properties defined
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})


module.exports = {User}
