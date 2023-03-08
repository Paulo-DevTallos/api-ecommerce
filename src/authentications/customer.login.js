const CustomerModel = require("../models/customer.model");

// CRIAR ESTRUTURA PARA LOGIN DO CUSTOMER
exports.login = async (req, res) => {
	const { email, password } = req.body;

	// fazer checkagem dos campos
	if (!email && !password) {
		res
			.status(httpStatusCode.UNAUTHORIZED)
			.json({ message: throwNewError.ENTITY_FIELDS_EMPTY.message });
		return;
	}

	const customer = await CustomerModel.findOne({ email })

	return res.json(customer)
}
