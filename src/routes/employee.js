const router = require('./index');
const {
	createEmployee,
} = require('../controllers/employee.controller');

router.post('/employee/create', createEmployee)

module.exports = router;
