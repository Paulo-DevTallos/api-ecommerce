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
const upload = require('../middlewares/upload-middleware');

// criar um novo produto
router.post("/product/create", upload.single('image'), createProduct);

// listar produtos por loja
router.get("/products/store/:id", filterProductsByStore);

// atualizar um produto
router.patch("/product/update/:id", updateProduct);

// capturar produtos especificos por palavra chave
router.get("/products/search", getProductByQueryParam);

//example url http://localhost:3030/products/paginate?page=1&limit=10&sort=price,desc
/**
 * rota paginada
 * lista produtos por paginação e realiza pesquisas ordenadas
 */
router.get("/products/paginate", getPaginatedProducts);

// listar todos os produtos
router.get("/products/:id?", getProducts);

// remover um produto
router.delete("/product/:id", removeProduct);

module.exports = router;
