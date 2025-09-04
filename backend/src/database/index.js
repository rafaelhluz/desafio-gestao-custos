const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('desafio_gestao_custos', 'root', '1322', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;