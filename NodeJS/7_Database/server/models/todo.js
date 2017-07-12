var mongoose = require('mongoose');

//creates a model called todo, what the structure of each item we are saving will look like
var Todo = mongoose.model('Todo', {
  //each of these are a new attribute with properties defined
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports = {Todo}
