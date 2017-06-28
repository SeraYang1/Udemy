console.log("HI");

setTimeout(() => {
  console.log("Loaded")
}, 2)

setTimeout(() => {
  console.log("No delay")
}, 1)
setTimeout(() => {
  console.log("No delay")
}, 1)
setTimeout(() => {
  console.log("No delay")
}, 1)
setTimeout(() => {
  console.log("No delay")
}, 1)
setTimeout(() => {
  console.log("No delay")
}, 1)
setTimeout(() => {
  console.log("No delay")
}, 1)

setTimeout(() => {
  console.log("2")
}, 0)

console.log("BYE");

//Node will run all non-timeout functions first
//then all timeout functions run w respect to speed and order
