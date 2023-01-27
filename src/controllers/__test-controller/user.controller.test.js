const { getCurstomers } = require('../customer.controller')

it('get all users', () => {
	expect( getCurstomers ).toBe(4)
})
