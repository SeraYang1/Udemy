class User {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room}
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var unfilteredId = this.users.filter((user) => {
      return user.id !== id
    })
    var filteredId = this.users.filter((user) => {
      return user.id === id
    })
    this.users = unfilteredId
    return filteredId[0]
  }

  getUser(id){
    var filteredId = this.users.filter((user) => {
      return user.id === id
    })
    return filteredId[0]
  }

  getUserList(room){
    var filteredUsers = this.users.filter((user) => {
      return user.room === room;
    })
    return filteredUsers.map((user) => {
      return user.name
    })
  }
}

module.exports = {
  User
}
