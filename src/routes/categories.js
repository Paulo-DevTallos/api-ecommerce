const router = require('./index')
const { createCategory, getCategories, getProductByCategories } = require('../controllers/category.controller');

router.get('/categories/:id?', getCategories);
router.get('/categories/:id/products', getProductByCategories);
router.post('/categories/create', createCategory);

module.exports = router;
