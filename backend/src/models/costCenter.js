const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class CostCenter extends Model {}

CostCenter.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CostCenter',
  tableName: 'CostCenters'
});

module.exports = CostCenter;