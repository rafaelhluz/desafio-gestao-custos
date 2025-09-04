const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const CostCenter = require('./costCenter');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'despesa',
  },
});

// Associações
Expense.belongsTo(CostCenter, {
  foreignKey: 'costCenterId',
});

CostCenter.hasMany(Expense, {
  foreignKey: 'costCenterId',
});

module.exports = Expense;