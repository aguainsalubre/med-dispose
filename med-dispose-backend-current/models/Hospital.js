const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospital = sequelize.define('Hospital', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING(255)
  },
  telefone: {
    type: DataTypes.STRING(30)
  }
}, {
  tableName: 'hospitais',
  timestamps: true
});

module.exports = Hospital;
