const expect = require('expect');
const reqire = require('rewire');

var app = require('./app')
//Spies are basically testing to see if something gets called
describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db)
  //basically sets the db as a spy so we can check if its being called properly

  it('Should use spy', () => {
    var spy = expect.createSpy();
    spy("hello");
    expect(spy).toHaveBeenCalledWith("HELLO");
  })

  it('test', () => {
    var email = "email"
    var password = "pass"

    app.handleSignup(email, password)
    expect(db.saveUser).toHaveBeenCalledWith({email, password})
  })
})
