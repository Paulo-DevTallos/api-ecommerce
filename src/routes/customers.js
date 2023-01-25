const router = require("./index");
const { createCustomer, getCustomers } = require("../controllers/customer.controller");

router.get("/customer/:id?", getCustomers);
router.post("/customer/create", createCustomer);

module.exports = router;
