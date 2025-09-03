const Expense = require('../models/expense');
const CostCenter = require('../models/costCenter');

// Lógica para listar todas as despesas (opcionalmente por centro de custo)
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [{ model: CostCenter, attributes: ['name'] }], // Inclui o nome do centro de custo
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar despesas.' });
  }
};

// Lógica para criar uma nova despesa
exports.createExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar despesa.' });
  }
};

// Lógica para atualizar uma despesa
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Expense.update(req.body, { where: { id } });
    if (updated) {
      const updatedExpense = await Expense.findByPk(id);
      res.json(updatedExpense);
    } else {
      res.status(404).json({ error: 'Despesa não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar despesa.' });
  }
};

// Lógica para deletar uma despesa
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send("Despesa deletada.");
    } else {
      res.status(404).json({ error: 'Despesa não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar despesa.' });
  }
};