const router = require('./index');
const {
	createStore,
	getStores,
	getStoresByLocation,
	removeStore
} = require('../controllers/store.controller');

router.post('/store/create', createStore);
router.get('/stores/:id?', getStores);
router.post('/stores/geolocation', getStoresByLocation);
router.delete('/store/:id', removeStore);

module.exports = router;

// ex: http://localhost:1346?nome="+user+"&lat="+lat+"&lon="+lng, null
