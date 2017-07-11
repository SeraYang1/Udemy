var add = (a, b) => {
  return a + b ;
}

var square = (a) => {
  return a * a;
}

var setName = (user, fullName) => {
  var names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
}

var moreAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(add(a, b))}, 100
  )
}

var moreSquare = (a, callback) => {
  setTimeout(() => {
    callback(square(a))}, 50
  )
}

module.exports = {
  add,
  square,
  setName,
  moreAdd,
  moreSquare
}
