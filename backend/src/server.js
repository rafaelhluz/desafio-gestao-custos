// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const costCenterRoutes = require('./routes/costCenterRoutes');
const expenseRoutes = require('./routes/expenseRoutes'); // importa rotas
require('./models/costCenter'); // importa model para registrar no Sequelize
require('./models/expense'); // importa model para registrar no Sequelize

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/cost-centers', costCenterRoutes);
app.use('/api/expenses', expenseRoutes);

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
