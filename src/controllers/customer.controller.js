const { httpStatusCode, throwNewError } = require("../../config/error-tratament");
const CustomerModel = require("../models/customer.model");

exports.createCustomer = async (req, res) => {
	const { ...data } = req.body;

	const isCustomer = await CustomerModel.findOne({ email: data.email });
	console.log(isCustomer);

	try {
		if(isCustomer) {
			res.status(httpStatusCode.CONFLICT).json({ message: throwNewError.EXISTANT_REGISTER.message });
		} else {
			const customer = await CustomerModel.create({
				...data,
			});

			res.status(201).json({ customer, message: "cliente cadastrado com sucesso" });
		}
	} catch (error) {
		res.status(400).json({ error, message: 'não foi possível criar o cliente' })
	}
};

exports.getCustomers = async (req, res) => {

}
