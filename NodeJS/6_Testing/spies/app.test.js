const expect = require('expect');
const reqire = require('rewire');

var app = require('./app')

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db)

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
