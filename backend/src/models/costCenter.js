const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CostCenter = sequelize.define('CostCenter', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CostCenter;