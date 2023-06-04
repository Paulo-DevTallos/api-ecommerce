const router = require('./index');
const {
	createEmployee,
	updateEmployee,
	getAllEmployees,
	removeEmployee
} = require('../controllers/employee.controller');
const { login } = require('../authentications/employee.login');

//criação de novo funcionário
router.post('/employee/create', createEmployee);
//login
router.post('/employee/auth', login);
//listar todos os funcionario ou por id
router.get('/employees/:id?', getAllEmployees);
//atualizar um funcionário
router.patch('/employee/:id', updateEmployee);
//remover um usuário
router.delete('/employee/:id?', removeEmployee)

module.exports = router;
