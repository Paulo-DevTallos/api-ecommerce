const router = require('./index');

router.get('/', (req, res) => {
	res.send('criando rota');
});


module.exports = router;
