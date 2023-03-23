const express = require('express');

const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listSalesById);
router.put('/:id', salesController.updateSales);
router.post('/', salesController.registerSales);
router.delete('/:id', salesController.deleteSales);

module.exports = router;