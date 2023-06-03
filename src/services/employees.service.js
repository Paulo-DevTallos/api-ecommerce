const EmployeeModel = require('../models/employee.model');
const ObjectId = require('mongodb').ObjectId

exports.findEmployeeService = (identifier) => {

	const isValidId = ObjectId.isValid(identifier)
	// processa uma categoria de acordo com a busca solicitada
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
	return await EmployeeModel.updateOne(
		{ _id: id },
		{
			$set: body
		},
		{ new: true }
	);
};
