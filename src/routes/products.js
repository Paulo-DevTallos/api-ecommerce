const router = require("./index");
const {
	getProducts,
	createProduct,
	removeProduct
} = require("../controllers/product.controller");

router.get("/products/:id?", getProducts);
router.post('/product/create', createProduct);
router.delete('/product/:id', removeProduct);

module.exports = router;
