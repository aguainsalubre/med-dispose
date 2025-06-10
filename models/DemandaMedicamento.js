// Este arquivo define o modelo Sequelize para a tabela 'demandas_medicamentos'.

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa a instância do Sequelize configurada, com .js.

// Define o modelo 'DemandaMedicamento'.
const DemandaMedicamento = sequelize.define('DemandaMedicamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_medicamento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantidade_necessaria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // A coluna `id_hospital` será criada automaticamente quando a associação for definida.
}, {
    tableName: 'demandas_medicamentos', // Nome da tabela no banco de dados.
    timestamps: true                   // Sequelize adicionará colunas `createdAt` e `updatedAt`.
});

export default DemandaMedicamento; // Exporta o modelo DemandaMedicamento.
