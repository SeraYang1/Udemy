const expect = require('expect')
const utils = require('./utils')


describe('Utils', () => {
	it('Add two numbers', () => {
		var result = utils.add(4, 5);
		expect(result).toBeA('number').toBe(9);
	})

	it('Async add two numbers', (done) => {
		var result = utils.moreAdd(4, 3, (sum) => {
			expect(sum).toBe(7).toBeA('number')
			done()
		})
	})

	it('Square a number', () => {
		var result = utils.square(4);

		expect(result).toBeA('number').toBe(16);
	})

	it('Async square a number', (done) => {
		var result = utils.moreSquare(4, (sum) => {
			expect(sum).toBe(16).toBeA('number')
			done()
		})
	})
})


it('Check names', () => {
	var user = {
		firstName: "Hello",
		age: "25"
	}
	user = utils.setName(user, "Sera Yang")
	expect(user).toBeA('object').toInclude({
		firstName: "Sera",
		lastName: "Yang"
	})
})
