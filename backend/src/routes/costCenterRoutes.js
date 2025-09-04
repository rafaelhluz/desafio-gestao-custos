const express = require('express');
const router = express.Router();
const costCenterController = require('../controllers/costCenterController');

// Rota GET para listar centros de custo
router.get('/', costCenterController.getAllCostCenters);

// Rota POST para criar um centro de custo
router.post('/', costCenterController.createCostCenter);

// Rota PUT para atualizar um centro de custo
router.put('/:id', costCenterController.updateCostCenter);

// Rota DELETE para deletar um centro de custo
router.delete('/:id', costCenterController.deleteCostCenter);

module.exports = router;