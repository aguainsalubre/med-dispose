const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicamento = sequelize.define('Medicamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING(100)
    },
    validade: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    estado_conservacao: {
        type: DataTypes.ENUM('bom', 'ruim', 'vencido'),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'medicamentos',
    timestamps: true
});

module.exports = Medicamento;
