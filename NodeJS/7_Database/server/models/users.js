const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
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

//overrides the function so that it doens't return private infor (pass/token)
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  //only returns items we tell it to return
  return _.pick(userObject, ['email','_id'])
}

//difference between this and arrow func, allows this
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()

  //adds this to the users attributes, only locally
  user.tokens.push({access, token})

  //returns a variable when a promise is called
  return user.save().then(() => {
    return token;
  })
}

//UserSchema.methods = instance methods, UserShema.statiscs = class methods
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    //need to have '' when there is a period
    'tokens.token': token,
    'tokens.access': 'auth' // might not exist
  })
}

var User = mongoose.model('User', UserSchema)


module.exports = {User}
