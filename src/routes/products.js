const router = require("./index");
const {
	getProducts,
	createProduct,
	removeProduct,
	getProductByQueryParam,
	filterProductsByStore,
	updateProduct,
	getPaginatedProducts,
	ordenateProductsByPrice,
	ordenateProductsByCreation
} = require("../controllers/product.controller");

router.post("/product/create", createProduct);
router.get("/products/store/:id", filterProductsByStore);
router.patch("/product/update/:id", updateProduct);
router.get("/products/search", getProductByQueryParam);
router.get("/products/price", ordenateProductsByPrice);
router.get("/products/create", ordenateProductsByCreation);
router.get("/products?page=:page&limit=:limit", getPaginatedProducts);
router.get("/products/:id?", getProducts);
router.delete("/product/:id", removeProduct);

module.exports = router;
