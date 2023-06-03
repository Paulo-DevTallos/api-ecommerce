const EmployeeModel = require('../models/employee.model');

exports.findOneEmployeeService = (identifier) => {
	return EmployeeModel.findOne(identifier)
}

exports.createEmployeeService = async (body) => {
	return await EmployeeModel.create(body)
};
