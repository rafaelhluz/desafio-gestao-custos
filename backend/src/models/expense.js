const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const CostCenter = require('./costCenter');

class Expense extends Model {}

Expense.init({
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Expense',
  tableName: 'Expenses'
});

// Define a relação entre Expense e CostCenter
CostCenter.hasMany(Expense, { foreignKey: 'costCenterId' });
Expense.belongsTo(CostCenter, { foreignKey: 'costCenterId' });

module.exports = Expense;