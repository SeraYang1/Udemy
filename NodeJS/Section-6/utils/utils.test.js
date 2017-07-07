const expect = require('expect')
const utils = require('./utils')

it('Add two numbers', () => {
  var result = utils.add(4, 5);
  expect(result).toBeA('number').toBe(9);
})

it('Square a number', () => {
  var result = utils.square(4);

  expect(result).toBeA('number').toBe(16);
})

it('Check names', () => {
  var user = {
    firstName: "Hello",
    age: "25"
  }
  user = utils.setName(user, "Sera Hi")
  expect(user).toBeA('object').toInclude({firstName: "Sera", lastName: "Yang"})
})
