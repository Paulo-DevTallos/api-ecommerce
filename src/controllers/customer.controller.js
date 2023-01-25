const { httpStatusCode, throwNewError, successStatus } = require("../../config/error-tratament");
const { Encript } = require("../helpers/cripto");
const CustomerModel = require("../models/customer.model");

exports.createCustomer = async (req, res) => {
	const { ...data } = req.body;

	const isCustomer = await CustomerModel.findOne({ email: data.email });

	try {
		if(isCustomer) {
			res.status(httpStatusCode.CONFLICT).json({ message: throwNewError.EXISTANT_REGISTER.message });
		} else {
			const hashingPass = await Encript.CriptoPassword(data.password);
			const customer = await CustomerModel.create({
				...data,
				password: data.password = hashingPass,
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

exports.removeCustomer = async (req, res) => {
	const { id } = req.params;

	const isCustomer = await CustomerModel.findById({ _id: id });
	try {

		if (isCustomer) {
			const remove = await CustomerModel.deleteOne(isCustomer);
			console.log(res.status());

			res
				.status(httpStatusCode.SUCCESS_NO_CONTENT)
				.json({ remove, message: successStatus.REMOVED_RESOURCE.message });
		} else {
			res.status(httpStatusCode.NOT_FOUND).json({ message: throwNewError.RESOURCE_NOT_FOUND.message });
		}
	}
	catch (error) {
		console.log(error);
		res.status(httpStatusCode.BAD_REQUEST).json({ error, message: throwNewError.REQUEST_FAILED.message });
 	}
}
