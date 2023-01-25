const router = require("./index");
const { createCustomer } = require("../controllers/customer.controller");

router.post("/customer/create", createCustomer);

module.exports = router;
