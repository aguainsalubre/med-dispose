// Este arquivo define o modelo Sequelize para a tabela 'locais_descarte'.

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa a instância do Sequelize configurada, com .js.

// Define o modelo 'LocalDescarte'.
const LocalDescarte = sequelize.define('LocalDescarte', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    endereco: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE, // Tipo de dado para números com ponto flutuante de dupla precisão.
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE, // Tipo de dado para números com ponto flutuante de dupla precisão.
        allowNull: false
    }
}, {
    tableName: 'locais_descarte', // Nome da tabela no banco de dados.
    timestamps: true               // Sequelize adicionará colunas `createdAt` e `updatedAt`.
});

export default LocalDescarte; // Exporta o modelo LocalDescarte.
