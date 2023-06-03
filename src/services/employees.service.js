const EmployeeModel = require('../models/employee.model');

exports.createEmployeeService = async (body) => {
	return await EmployeeModel.create(body)
};
