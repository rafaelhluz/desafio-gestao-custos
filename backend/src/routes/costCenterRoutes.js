const express = require('express');
const router = express.Router();
const costCenterController = require('../controllers/costCenterController');

router.get('/', costCenterController.getAllCostCenters);

router.post('/', costCenterController.createCostCenter);

router.put('/:id', costCenterController.updateCostCenter);

router.delete('/:id', costCenterController.deleteCostCenter);

module.exports = router;