// Este arquivo define o modelo Sequelize para a tabela 'medicamentos'.

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa a instância do Sequelize configurada, com .js.

// Define o modelo 'Medicamento'.
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
        type: DataTypes.DATEONLY, // Tipo de dado para representar apenas a data (AAAA-MM-DD), sem informações de tempo.
        allowNull: true          // Permite que a validade seja nula se não for especificada no banco.
    },
    estado_conservacao: {
        type: DataTypes.ENUM('bom', 'ruim', 'vencido'), // Enumeração para o estado de conservação do medicamento.
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 1 // Define um valor padrão de 1 se a quantidade não for fornecida.
    }
    // A coluna `id_hospital` será criada automaticamente quando a associação for definida.
}, {
    tableName: 'medicamentos', // Nome da tabela no banco de dados.
    timestamps: true           // Sequelize adicionará colunas `createdAt` e `updatedAt`.
});

export default Medicamento; // Exporta o modelo Medicamento.
