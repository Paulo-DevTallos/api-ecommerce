const { httpStatusCode, throwNewError } = require('../../config/error-tratament');
const { Encript } = require('../helpers/cripto');
const EmployeeService = require('../services/employees.service');
const SessionModel = require('../models/session.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
	const { employee_email, password } = req.body;

	if (!employee_email || !password) {
		res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
			message: throwNewError.ENTITY_FIELDS_EMPTY.message
		})
	}

	const employee = await EmployeeService.findEmployeeService({ employee_email });

	try {
		if (employee) {
			const checkPassword = await Encript.ComparePassword(password, employee.password);

			if (!checkPassword) {
				res.status(httpStatusCode.UNAUTHORIZED).json({
					message: throwNewError.INVALID_PASSWORD.message
				});

			} else {
				const secret = process.env.SECRET_KEY;

				const token = jwt.sign(
					{
						id: employee._id,
						employee_name: employee.employee_name,
						employee_email: employee.employee_email,
						registration: employee.registration
					},
					secret
				);

				//criando sessao no banco de dados
				const session = {
					userKey: employee.employee_email,
					jwt: token,
				}

				if (session.userKey === employee_email) {
					await SessionModel.deleteOne({ userKey: session.userKey }).exec()
				}

				await SessionModel.create(session);

				res
					.status(httpStatusCode.OK)
					.json({
						employee,
						password: employee.password = undefined,
						token,
					});
			}
		}
	} catch (error) {
		res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
			error,
			message: throwNewError.INTERNAL_SERVER_ERROR.message
		});
	}
}
