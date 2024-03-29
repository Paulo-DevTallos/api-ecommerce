const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	employee_name: {
		type: String,
		required: true,
	},
	employee_email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	roles: {
		type: String,
		required: true
	},
	registration: {
		type: String
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active'
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

const EmployeeModel = mongoose.model('employee', schema);

module.exports = EmployeeModel
