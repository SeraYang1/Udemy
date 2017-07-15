const mongoose = require('mongoose');
const validator = require('validator')

var User = mongoose.model('User', {
  //each of these are a new attribute with properties defined
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    //cannot have any other user w same email.
    unique: true,
    //checks to see if the email is valid
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },token: {
      type: String,
      required: true
    }
  }]
})


module.exports = {User}
