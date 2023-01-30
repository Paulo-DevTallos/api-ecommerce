const router = require('./index');
const {
	createStore,
	getStores,
	getStoresByLocation,
	removeStore,
	updateStore,
	filterStoreByProducts
} = require('../controllers/store.controller');

router.post('/store/create', createStore);
router.get('/stores/:id?', getStores);
router.post('/stores/geolocation', getStoresByLocation);
router.post('/stores/product/:product_id', filterStoreByProducts);
router.patch('/store/update/:id', updateStore);
router.delete('/store/remove/:id', removeStore);

module.exports = router;

// ex: http://localhost:1346?nome="+user+"&lat="+lat+"&lon="+lng, null
