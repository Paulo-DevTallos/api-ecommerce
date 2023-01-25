const CustomerModel = require("../models/customer.model");

const createCustomer = async (req, res) => {
	const { ...data } = req.body;

	const customer = await CustomerModel.create({
		...data,
	});

	res.status(201).json({ customer, message: "cliente cadastrado com sucesso" });
};

module.exports = {
	createCustomer,
};
