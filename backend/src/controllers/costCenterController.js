const CostCenter = require('../models/costCenter');

exports.getAllCostCenters = async (req, res) => {
  try {
    const costCenters = await CostCenter.findAll();
    res.status(200).json(costCenters);
  } catch (error) {
    console.error('Erro ao buscar centros de custo:', error);
    res.status(500).json({ error: 'Erro ao buscar centros de custo.' });
  }
};

exports.createCostCenter = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'O nome é obrigatório.' });
    }
    const newCostCenter = await CostCenter.create({ name });
    res.status(201).json(newCostCenter);
  } catch (error) {
    console.error('Erro ao criar centro de custo:', error);
    res.status(500).json({ error: 'Erro ao criar centro de custo.' });
  }
};

exports.updateCostCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const [updated] = await CostCenter.update({ name }, {
            where: { id: id }
        });

        if (updated) {
            const updatedCostCenter = await CostCenter.findByPk(id);
            return res.status(200).json(updatedCostCenter);
        }

        throw new Error('Centro de Custo não encontrado.');
    } catch (error) {
        console.error('Erro ao atualizar centro de custo:', error);
        res.status(500).json({ error: 'Erro ao atualizar centro de custo.' });
    }
};

exports.deleteCostCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CostCenter.destroy({
            where: { id: id }
        });
        
        if (deleted) {
            return res.status(204).send("Centro de Custo deletado com sucesso.");
        }
        
        throw new Error("Centro de Custo não encontrado.");
    } catch (error) {
        console.error('Erro ao deletar centro de custo:', error);
        res.status(500).json({ error: 'Erro ao deletar centro de custo.' });
    }
};