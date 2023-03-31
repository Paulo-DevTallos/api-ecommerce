const router = require("./index");
const {
	createCustomer,
	getCustomers,
	removeCustomer,
	getCustomerByQueryParam,
	addProductToCart
} = require("../controllers/customer.controller");
const { login } = require("../authentications/customer.login");

router.post("/customer/create", createCustomer);
router.get("/customer/search", getCustomerByQueryParam);
router.patch('/customer/:customer_id/addcart/:product_id', addProductToCart);
router.get("/customer/:id?", getCustomers);
router.delete("/customer/:id", removeCustomer);

module.exports = router;
