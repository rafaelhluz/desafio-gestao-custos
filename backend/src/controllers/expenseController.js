const Expense = require('../models/expense');
const CostCenter = require('../models/costCenter');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: CostCenter,
        },
      ],
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Erro ao buscar despesas:', error);
    res.status(500).json({ error: 'Erro ao buscar despesas.' });
  }
};

exports.createExpense = async (req, res) => {
    try {
        const newExpense = await Expense.create(req.body);
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Erro ao criar despesa:', error);
        res.status(500).json({ error: 'Erro ao criar despesa.' });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Expense.update(req.body, {
            where: { id: id }
        });
        
        if (updated) {
            const updatedExpense = await Expense.findByPk(id);
            return res.status(200).json(updatedExpense);
        }

        throw new Error('Despesa não encontrada.');
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
        res.status(500).json({ error: 'Erro ao atualizar despesa.' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Expense.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(204).send("Despesa deletada com sucesso.");
        }
        
        throw new Error("Despesa não encontrada.");
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
        res.status(500).json({ error: 'Erro ao deletar despesa.' });
    }
};