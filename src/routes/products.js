const router = require("./index");
const {
	getProducts,
	createProduct,
	removeProduct,
	getProductByQueryParam
} = require("../controllers/product.controller");

router.post('/product/create', createProduct);
router.get("/product/search", getProductByQueryParam);
router.get("/products/:id?", getProducts);
router.delete('/product/:id', removeProduct);

module.exports = router;
