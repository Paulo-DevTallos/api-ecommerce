const router = require("./index");
const {
	getProducts,
	createProduct,
	removeProduct,
	getProductByQueryParam,
	filterProductsByStore,
	updateProduct,
	getPaginatedProducts,
	ordenateProducts,
} = require("../controllers/product.controller");

router.post("/product/create", createProduct);
router.get("/products/store/:id", filterProductsByStore);
router.patch("/product/update/:id", updateProduct);
router.get("/product/search", getProductByQueryParam);
router.get("/products/ordenate", ordenateProducts);
router.get("/products?page=:page&limit=:limit", getPaginatedProducts);
router.get("/products/:id?", getProducts);
router.delete("/product/:id", removeProduct);

module.exports = router;
