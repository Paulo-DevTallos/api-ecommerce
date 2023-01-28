const router = require("./index");
const {
	createCustomer,
	getCustomers,
	removeCustomer,
	getCustomerByQueryParam,
	addProductToCart
} = require("../controllers/customer.controller");

router.post("/customer/create", createCustomer);
router.get("/customer/search", getCustomerByQueryParam);
router.patch('/customer/:id/addcart/:id', addProductToCart);
router.get("/customer/:id?", getCustomers);
router.delete("/customer/:id", removeCustomer);

module.exports = router;
