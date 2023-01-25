const router = require("./index");
const { createCustomer, getCustomers, removeCustomer } = require("../controllers/customer.controller");

router.get("/customer/:id?", getCustomers);
router.post("/customer/create", createCustomer);
router.delete("/customer/:id", removeCustomer);

module.exports = router;
