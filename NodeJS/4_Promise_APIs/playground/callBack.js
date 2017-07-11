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
