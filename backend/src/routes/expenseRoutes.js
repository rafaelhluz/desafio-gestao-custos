const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Rota para listar todas as despesas
router.get('/', expenseController.getAllExpenses);

// Rota para criar uma nova despesa
router.post('/', expenseController.createExpense);

// Rota para atualizar uma despesa por ID
router.put('/:id', expenseController.updateExpense);

// Rota para deletar uma despesa por ID
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;