// Este arquivo define o modelo Sequelize para a tabela 'usuarios'.

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa a instância do Sequelize configurada, com .js.

// Define o modelo 'User'.
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(255), // String mais longa para armazenar senhas com hash.
        allowNull: false
    },
    tipo_usuario: {
        type: DataTypes.ENUM('civil', 'hospital'), // Tipo ENUM com valores permitidos.
        allowNull: false
    },
    // A coluna `id_hospital` será criada automaticamente pelo Sequelize quando a associação for definida.
}, {
    tableName: 'usuarios', // Nome da tabela no banco de dados.
    timestamps: true       // Sequelize adicionará colunas `createdAt` e `updatedAt`.
});

export default User; // Exporta o modelo User.
