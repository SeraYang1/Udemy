//callback - method gets executed later, basically passing in a funciton as a parameter
var getUser = (id, callBack) => {
  var user = {
    id: id,
    name: "tempName"
  }
  setTimeout(() => {
    callBack(user)
  }, 3000);
}

getUser(31, (user) => {
  console.log(user);
});
