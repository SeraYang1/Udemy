const expect = require("expect");

const {User} = require("./users")

describe("Users", () => {

  var users;
  beforeEach(() => {
    users = new User();
    users.users = [{
      id: 1,
      name: "A",
      room: "One"
    }, {
      id: 2,
      name: "B",
      room: "Two"
    }, {
      id: 3,
      name: "C",
      room: "One"
    }, ]
  })

  it("Add new user", () => {
    var users = new User();
    var user = {
      id: 123,
      name: "Sera",
      room: "Room"
    }
    var resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user]);
  })

  it("Remove user", () => {
    var output = users.removeUser(1)

    expect(output.name).toEqual("A")
    expect(output.room).toEqual("One")
    expect(users.users.length).toEqual(2)
  })

  it("Get user", () => {
    var output = users.getUser(1)

    expect(output.name).toEqual("A")
    expect(output.room).toEqual("One")

    expect(users.users.length).toEqual(3)
  })

  it("Get user list", () => {
    var list = users.getUserList("One")
    expect(list.length).toEqual(2)

    expect(list).toInclude("A")

    expect(list).toInclude("C")
  })
})
