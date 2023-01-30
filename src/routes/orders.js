const { getOrders, createOrder } = require('../controllers/order.controller');
const router = require('../routes/index');

router.get('/orders/:id?', getOrders);
router.post('/order/create/:id', createOrder);

module.exports = router;
