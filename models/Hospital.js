// Este arquivo define o modelo Sequelize para a tabela 'hospitais'.

import { DataTypes } from 'sequelize'; // Importa DataTypes para definir os tipos de coluna.
import sequelize from '../config/database.js'; // Importa a instância do Sequelize configurada, com .js.

// Define o modelo 'Hospital'.
const Hospital = sequelize.define('Hospital', {
    id: {
        type: DataTypes.INTEGER,       // Tipo inteiro.
        autoIncrement: true,           // Coluna auto-incrementável (como AUTO_INCREMENT no SQL).
        primaryKey: true               // Define esta coluna como a chave primária da tabela.
    },
    nome: {
        type: DataTypes.STRING(100),   // String com comprimento máximo de 100 caracteres.
        allowNull: false               // Corresponde a NOT NULL no SQL.
    },
    cnpj: {
        type: DataTypes.STRING(20),    // String com comprimento máximo de 20 caracteres.
        unique: true,                  // Garante que o valor nesta coluna seja único em toda a tabela.
        allowNull: false
    },
    endereco: {
        type: DataTypes.TEXT,          // Tipo de texto para armazenar endereços potencialmente longos.
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20)     // String com comprimento máximo de 20 caracteres.
    }
}, {
    tableName: 'hospitais',            // Define explicitamente o nome da tabela no banco de dados.
    timestamps: true                   // Sequelize adicionará colunas `createdAt` e `updatedAt` automaticamente.
});

export default Hospital; // Exporta o modelo Hospital como o export padrão do módulo.
