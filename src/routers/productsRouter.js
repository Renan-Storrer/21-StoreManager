const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listProductsById);
router.get('/search', productsController.searchProduct);
router.post('/', productsController.registerProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProductById);

module.exports = router;