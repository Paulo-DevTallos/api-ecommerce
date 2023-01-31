const { httpStatusCode, throwNewError } = require('../../config/error-tratament');
const { Encript } = require('../helpers/cripto');
const EmployeeModel = require('../models/employee.model');
const SessionModel = require('../models/session.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
	const { employee_email, password } = req.body;

	// fazer checkagem dos campos
	if (!employee_email && !password) {
		res
			.status(httpStatusCode.UNAUTHORIZED)
			.json({ message: throwNewError.ENTITY_FIELDS_EMPTY.message });
		return;
	}
	if (!employee_email || !password) {
		res
			.status(httpStatusCode.UNAUTHORIZED)
			.json({ message: throwNewError.ANY_ENTITY_EMPTY.message });
		return;
	}

	// encontrar customer para entrar no try catch
	const employee = await EmployeeModel.findOne({ employee_email });

	//tratar erro do email digitado sendo diferente do email existente

	try {
		if (employee) {
			const checkPassword = await Encript.ComparePassword(password, employee.password);

			if (!checkPassword) {
				res
					.status(httpStatusCode.UNAUTHORIZED)
					.json({ message: throwNewError.INVALID_PASSWORD.message });
			} else {
				const secret = process.env.SECRET_KEY;

				const token = jwt.sign(
					{
						id: employee._id,
						name: employee.employee_name,
						email: employee.employee_email,
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
		res
			.status(httpStatusCode.INTRNAL_SERVER_ERROR)
			.json({ message: throwNewError.SEVERAL_INTERAL_SERVER_ERROR.message });
	}
}
