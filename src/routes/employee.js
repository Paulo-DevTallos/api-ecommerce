const router = require('./index');
const {
	createEmployee,
	updateEmployee
} = require('../controllers/employee.controller');
const { login } = require('../authentications/employee.login');

//criação de novo funcionário
router.post('/employee/create', createEmployee);
//login
router.post('/employee/auth', login);
//atualizar um funcionário
router.patch('/employee/:id', updateEmployee);

module.exports = router;
