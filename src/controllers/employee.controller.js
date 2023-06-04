const {
	httpStatusCode,
	successStatus,
	throwNewError
} = require('../../config/error-tratament');
const { Encript } = require('../helpers/cripto');
const EmployeeService = require('../services/employees.service');
const globalHelpers = require('../helpers/global');
const { default: mongoose } = require('mongoose');

exports.createEmployee = async (req, res) => {
	const { ...data } = req.body;
	// criar sistema de validação de senha

	try {
		if (!data.employee_name || !data.employee_email || !data.password) {
			res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
				message: throwNewError.ANY_ENTITY_EMPTY.message
			})
		} else {
			const isEmployee = await EmployeeService.findEmployeeService({
				employee_email: data.employee_email
			});

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
		}
	} catch (error) {
		res.status(httpStatusCode.BAD_REQUEST).json({
			error, message: throwNewError.REQUEST_FAILED.message
		});
	}
}

exports.getAllEmployees = async (req, res) => {
	const { id } = req.params;

	try {
		const employeeId = id ? { _id: id } : null;

		EmployeeService.findEmployeeService(employeeId)
			.sort({ registration: 1 })
			.then(employees => {

				res.status(httpStatusCode.OK).json(employees);
			})
			.catch(() => {
				if (employeeId && !mongoose.Types.ObjectId.isValid(employeeId)) {
					res.status(httpStatusCode.BAD_REQUEST).json({
						message: throwNewError.IVALID_ID.message
					})
				} else {
					res.status(httpStatusCode.NOT_FOUND).json({
						message: throwNewError.RESOURCE_NOT_FOUND.message
					})
				}
			})
	} catch (error) {
		res.status(httpStatusCode.BAD_REQUEST).json({
			message: throwNewError.REQUEST_FAILED.message
		});
	}
}

exports.updateEmployee = async (req, res) => {
	const { id } = req.params;
	const { ...data } = req.body;

	try {
		if (!data.employee_name && !data.employee_email && !data.password) {
			res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
				message: throwNewError.EMPTY_FIELDS_FOR_UPDATE.message
			});
		} else {
			const isEmployee = await EmployeeService.findEmployeeService({ _id: id });

			if (isEmployee) {
				await EmployeeService.updateEmployeeService(id, data)

				res.status(httpStatusCode.NO_CONTENT).json({
					message: successStatus.UPDATED_RESOURCE.message
				});
			}
		}
	} catch (error) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(httpStatusCode.BAD_REQUEST).json({
				message: throwNewError.IVALID_ID.message
			});
		} else {
			res.sendStatus(httpStatusCode.BAD_REQUEST).json({
				message: throwNewError.RESOURCE_NOT_FOUND.message
			});
		}
	}
}

exports.changeEmployeeStatus = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
		const isEmployee = await EmployeeService.findEmployeeService({ _id: id })

		const employeeStatus = ['active', 'inactive'];

		const validateStatus = employeeStatus.includes(status);

		if (isEmployee && validateStatus) {
			EmployeeService.updateEmployeeService(isEmployee._id, { status })
				.then(() => {
					res.status(httpStatusCode.NO_CONTENT).json({
						message: successStatus.UPDATED_RESOURCE.message
					});
				});

		} else if (!validateStatus) {
			return res.status(httpStatusCode.NOT_FOUND).json({
				message: `${throwNewError.INVALID_STATUS.message}: ${employeeStatus}`
			})

		} else {
			res.status(httpStatusCode.NOT_FOUND).json({
				message: throwNewError.RESOURCE_NOT_FOUND.message
			});
		}

	} catch (error) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(httpStatusCode.BAD_REQUEST).json({
				message: throwNewError.IVALID_ID.message
			})
		} else {
			res.status(httpStatusCode.BAD_REQUEST).json({
				error, message: throwNewError.REQUEST_FAILED.message
			});
		}

	}
}

exports.removeEmployee = async (req, res) => {
	/**
	 * Atenção!
	 *
	 * o controlador de remoção de usuário trabalha com um parametro opcional
	 * caso ele receba um ObjectId válido irá remover o mesmo, caso não receba
	 * nenhum parametro irá remover toda a base de employees.
	 *
	 */
	const { id } = req.params;

	try {
		const employeeId = id ? { _id: id } : null;

		const isEmployee = await EmployeeService.findEmployeeService(employeeId);

		if (isEmployee) {
			EmployeeService.deleteEmployeesService(employeeId)
				.then(() => {

					res.status(httpStatusCode.NO_CONTENT).json({
						message: successStatus.REMOVED_RESOURCE.message
					});
				})
		} else {
			res.status(httpStatusCode.NOT_FOUND).json({
				message: throwNewError.RESOURCE_NOT_FOUND.message
			});
		}
	} catch (error) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(httpStatusCode.BAD_REQUEST).json({
				message: throwNewError.IVALID_ID.message
			})
		} else {
			res.status(httpStatusCode.BAD_REQUEST).json({
				error, message: throwNewError.REQUEST_FAILED.message
			});
		}
	}
}

