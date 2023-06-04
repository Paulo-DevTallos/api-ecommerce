const EmployeeModel = require('../models/employee.model');
const ObjectId = require('mongodb').ObjectId

/**
 *
 * identifier significa que a função pode receber um tipo de dado
 * de acordo com a query repassada, seja ele req.params, body ou query
 *
 */

exports.findEmployeeService = (identifier) => {
	//validar objectId
	const isValidId = ObjectId.isValid(identifier);
	//processa uma categoria de acordo com a busca solicitada
	if (isValidId) {
		return EmployeeModel.findById(identifier);
	} else if (!identifier) {
		//verifica se o argumento recebido é um id valido ou não
		const param = isValidId ? isValidId : null;
		return EmployeeModel.find(param);
	}
	else {
		return EmployeeModel.findOne(identifier);
	}
};

exports.createEmployeeService = async (body) => {
	return await EmployeeModel.create(body);
};

exports.updateEmployeeService = async (id, body) => {
	return await EmployeeModel.findOneAndUpdate(
		{ _id: id },
		{
			$set: body
		},
		{ new: true }
	);
};

exports.deleteEmployeesService = async (id) => {
	const isValidId = ObjectId.isValid(id);

	if (!id) {
		await EmployeeModel.deleteMany().exec();
	} else {
		await EmployeeModel.deleteOne(id).exec();
	}
};
