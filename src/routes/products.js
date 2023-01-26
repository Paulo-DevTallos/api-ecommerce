const router = require("./index");
const { getProducts } = require("../controllers/product.controller");

router.get("/products/:id?", getProducts);

module.exports = router;
