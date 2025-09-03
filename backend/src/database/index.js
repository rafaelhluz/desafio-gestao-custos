const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // O arquivo do banco de dados será criado aqui
});

module.exports = sequelize;