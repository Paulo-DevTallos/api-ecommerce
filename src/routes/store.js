const router = require('./index');
const { createStore, getStores } = require('../controllers/store.controller');

router.post('/store/create', createStore);
router.get('/stores/:id?', getStores);

module.exports = router;
