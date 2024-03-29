const { httpStatusCode, throwNewError } = require('../../config/error-tratament');
const { Encript } = require('../helpers/cripto');
const EmployeeService = require('../services/employees.service');
const SessionModel = require('../models/session.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
	const { employee_email, password } = req.body;

	try {
		if (!employee_email || !password) {
			res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
				message: throwNewError.ENTITY_FIELDS_EMPTY.message
			})
		} else {
			const employee = await EmployeeService.findEmployeeService({ employee_email });

			if (employee && employee.status !== 'inactive') {
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
			} else {
				res.status(httpStatusCode.UNAUTHORIZED).json({
					message: throwNewError.ACCESS_DENIED.message
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

exports.logout = async (req, res) => {
	console.log('Aqui funcionará a rota de logout')
}
