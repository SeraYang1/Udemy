// var somePromise = new Promise((resolve, reject) => {
//   reject("Hey! It worked!");
// })

// somePromise.then((message) => {
//   console.log("Success: "+message);
// }, (message) => {
//   console.log("Failed: "+message);
// })

//promise has resolve (success) and reject (failure) that executes later
//need to call then for each case
var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    if(typeof a === 'number' && typeof b === 'number'){
      resolve(a+b)
    }else{
      reject('Both inputs need to be numbers')
    }
  })
}

//then clause always does success first, then fail
asyncAdd(4, '5').then((success) => {
  console.log("Success: "+success)
}, (fail) => {
  console.log("Fail: "+fail)
})
