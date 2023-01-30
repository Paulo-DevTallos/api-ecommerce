const router = require('./index');
const {
	createEmployee,
} = require('../controllers/employee.controller');
const { login } = require('../authentications/employee.login');

router.post('/employee/create', createEmployee)

router.post('/employee/auth', login);

module.exports = router;
