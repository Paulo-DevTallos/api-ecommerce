const { getOrders, createOrder } = require('../controllers/order.controller');
const router = require('../routes/index');

// get orders
router.get('/orders/:id?', getOrders);
// create order
router.post('/order/create/:id', createOrder);

module.exports = router;
