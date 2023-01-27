const router = require("./index");
const {
	createCustomer,
	getCustomers,
	removeCustomer,
	getCustomerByQueryParam
} = require("../controllers/customer.controller");

router.post("/customer/create", createCustomer);
router.get("/customer/search", getCustomerByQueryParam);
router.get("/customer/:id?", getCustomers);
router.delete("/customer/:id", removeCustomer);

module.exports = router;
