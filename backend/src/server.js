const express = require('express');
const sequelize = require('./database');
const CostCenter = require('./models/costCenter');
const Expense = require('./models/expense');
const costCenterRoutes = require('./routes/costCenterRoutes');
const expenseRoutes = require('./routes/expenseRoutes'); // <-- Adicione esta linha

const app = express();
const port = 3000;

// Middleware para processar JSON e habilitar CORS (Cross-Origin Resource Sharing)
app.use(express.json());
const cors = require('cors'); // Você precisará instalar o 'cors'
app.use(cors());

// Conecta as rotas
app.use('/api/cost-centers', costCenterRoutes);
app.use('/api/expenses', expenseRoutes); // <-- Adicione esta linha

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado!');

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
  }
};

startServer();