const {
	httpStatusCode,
	successStatus,
	throwNewError
} = require('../../config/error-tratament');
const { Encript } = require('../helpers/cripto');
const EmployeeModel = require('../models/employee.model');

exports.createEmployee = async (req, res) => {
	const { ...data } = req.body;

	const isEmployee = await EmployeeModel.findOne({ email: data.email });

	try {
		if (!isEmployee) {
			const hashingPass = await Encript.CriptoPassword(data.password);
			const employee = await EmployeeModel.create({
				...data,
				password: (data.password = hashingPass),
			})

			res
				.status(httpStatusCode.CREATED)
				.json({ employee, message: successStatus.CREATED.message });
		} else {
			res
				.status(httpStatusCode.CONFLICT)
				.json({ message: throwNewError.EXISTANT_REGISTER.message });
		}
	} catch (error) {
		res
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error, message: throwNewError.REQUEST_FAILED.message });
	}
}
