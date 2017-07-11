console.log("HI");


//async sets a delay, all other functions get executed first
//async functions are saved while other functions are executing, then performed in order of when they finished
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
