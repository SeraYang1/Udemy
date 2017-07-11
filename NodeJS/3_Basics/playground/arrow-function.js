var square = (x) => x * x;

var test = 5;

var user = {
  name: "Sera",
  //arrow functions do not bind this
  //arrow functions do not bind parameters
  //can access things from before, but cannot access new things.
  sayHi: () => {
    console.log(test);
    console.log(arguments);
    console.log(`HI. I'm ${this.name}`);
  },

  sayHiImproved () {
    console.log(arguments)
    console.log(`HI. I'm ${this.name}`)
  }
};

user.sayHi(1, 2, 3);
