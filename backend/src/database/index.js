const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('desafio_gestao_custos', 'root', '1322', {
  host: 'localhost',
  dialect: 'mysql', // Certifique-se de que o dialeto é 'mysql'
});

module.exports = sequelize;