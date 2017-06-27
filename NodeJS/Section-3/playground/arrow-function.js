var square = (x) => x * x;
console.log(square(5))

var user = {
  name: "Sera",
  //arrow functions do not bind this
  sayHi: () => {
    console.log(arguments)
    console.log(`HI. I'm ${this.name}`);
  },

  sayHiImproved () {
    console.log(arguments)
    console.log(`HI. I'm ${this.name}`)
  }
};

user.sayHi(1, 2, 3);
