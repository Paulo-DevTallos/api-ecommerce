const { httpStatusCode, throwNewError, successStatus } = require("../../config/error-tratament");
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

			res.status(httpStatusCode.OK).json({ customer, message: successStatus.CREATED.message });
		}
	} catch (error) {
		res.status(httpStatusCode.BAD_REQUEST).json({ error, message: throwNewError.BAD_REQUEST.message });
	}
};

exports.getCustomers = async (req, res) => {
	const { id } = req.params;
	// verificar implementação por query params
	const customerId = id ? { _id: id } : null;

	const customer = await CustomerModel.find(customerId)
		.hint("email_1")
		.sort({ created_at: 1 });

	try {
		if (customer) res.status(httpStatusCode.OK).json({ customer });
	} catch (error) {
		res.status(httpStatusCode.BAD_REQUEST).json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
};
