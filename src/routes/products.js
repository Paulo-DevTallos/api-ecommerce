const router = require("./index");
const {
	getProducts,
	createProduct,
	removeProduct,
	getProductByQueryParam,
	filterProductsByStore,
	updateProduct,
	getPaginatedProducts,
} = require("../controllers/product.controller");

router.post("/product/create", createProduct);
router.get("/products/store/:id", filterProductsByStore);
router.patch("/product/update/:id", updateProduct);
router.get("/products/search", getProductByQueryParam);

//http://localhost:3030/products/paginate?page=1&limit=10&sort=price,desc
router.get("/products/paginate", getPaginatedProducts);
router.get("/products/:id?", getProducts);
router.delete("/product/:id", removeProduct);

module.exports = router;
