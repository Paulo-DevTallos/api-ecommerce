const {
	httpStatusCode,
	successStatus,
	throwNewError
} = require('../../config/error-tratament');
const { Encript } = require('../helpers/cripto');
const EmployeeModel = require('../models/employee.model');
const EmployeeService = require('../services/employees.service');
const globalHelpers = require('../helpers/global');

exports.createEmployee = async (req, res) => {
	const { ...data } = req.body;

	if (!data.employee_name || !data.employee_email || !data.password) {
		res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
			message: throwNewError.ENTITY_FIELDS_EMPTY.message
		})
	}

	const isEmployee = await EmployeeModel.findOne({ employee_email: data.employee_email });

	try {

		if (!isEmployee) {
			const hashingPass = await Encript.CriptoPassword(data.password);

			const employeeData = {
				...data,
				password: data.password = hashingPass,
				registration: `${globalHelpers.getSlugName(globalHelpers.truncate(data.employee_name))}_${globalHelpers.getHash()}`,
			};

			EmployeeService.createEmployeeService(employeeData)
				.then(employee => {
					res.status(httpStatusCode.CREATED).json({
						employee, message: successStatus.CREATED.message
					});
				})
		} else {
			res.status(httpStatusCode.CONFLICT).json({
				message: throwNewError.EXISTANT_REGISTER.message
			});
		}
	} catch (error) {
		res.status(httpStatusCode.BAD_REQUEST).json({
			error, message: throwNewError.REQUEST_FAILED.message
		});
	}
}
