const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const costCenterRoutes = require('./routes/costCenterRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Roteamento
app.use('/api/cost-centers', costCenterRoutes);
app.use('/api/expenses', expenseRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado!');
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
  }
};

// Exporte o app e a função de inicialização
module.exports = { app, startServer };