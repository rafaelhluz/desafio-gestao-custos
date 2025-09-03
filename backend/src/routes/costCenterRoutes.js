const express = require('express');
const router = express.Router();
const costCenterController = require('../controllers/costCenterController');

// Rota para listar todos os centros de custo
router.get('/', costCenterController.getAllCostCenters);

// Rota para criar um novo centro de custo
router.post('/', costCenterController.createCostCenter);

// Rota para atualizar um centro de custo por ID
router.put('/:id', costCenterController.updateCostCenter);

// Rota para deletar um centro de custo por ID
router.delete('/:id', costCenterController.deleteCostCenter);

module.exports = router;