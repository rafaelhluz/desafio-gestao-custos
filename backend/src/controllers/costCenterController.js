const CostCenter = require('../models/costCenter');

// Lógica para listar todos os centros de custo
exports.getAllCostCenters = async (req, res) => {
  try {
    const costCenters = await CostCenter.findAll();
    res.json(costCenters);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar centros de custo.' });
  }
};

// Lógica para criar um novo centro de custo
exports.createCostCenter = async (req, res) => {
  try {
    const newCostCenter = await CostCenter.create(req.body);
    res.status(201).json(newCostCenter);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar centro de custo.' });
  }
};

// Lógica para atualizar um centro de custo
exports.updateCostCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await CostCenter.update(req.body, { where: { id } });
    if (updated) {
      const updatedCostCenter = await CostCenter.findByPk(id);
      res.json(updatedCostCenter);
    } else {
      res.status(404).json({ error: 'Centro de custo não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar centro de custo.' });
  }
};

// Lógica para deletar um centro de custo
exports.deleteCostCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CostCenter.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send("Centro de custo deletado.");
    } else {
      res.status(404).json({ error: 'Centro de custo não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar centro de custo.' });
  }
};