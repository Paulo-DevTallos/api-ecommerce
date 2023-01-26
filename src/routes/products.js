const router = require("./index");
const { getProducts, createProduct } = require("../controllers/product.controller");

router.get("/products/:id?", getProducts);
router.post('/product/create', createProduct);

module.exports = router;
