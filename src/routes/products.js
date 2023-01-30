const router = require("./index");
const {
	getProducts,
	createProduct,
	removeProduct,
	getProductByQueryParam,
	filterProductsByStore,
	updateProduct,
} = require("../controllers/product.controller");

router.post('/product/create', createProduct);
router.get('/products/store/:id', filterProductsByStore);
router.patch('/product/update/:id', updateProduct);
router.get("/product/search", getProductByQueryParam);
router.get("/products/:id?", getProducts);
router.delete('/product/:id', removeProduct);

module.exports = router;
