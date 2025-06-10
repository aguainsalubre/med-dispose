// Este arquivo define o modelo Sequelize para a tabela 'transacoes'.

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa a instância do Sequelize configurada, com .js.

// Define o modelo 'Transacao'.
const Transacao = sequelize.define('Transacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo: {
        type: DataTypes.ENUM('troca', 'venda'), // Enumeração para o tipo de transação (troca ou venda).
        allowNull: false
    },
    data_transacao: {
        type: DataTypes.DATE, // Tipo de dado para data e hora.
        defaultValue: DataTypes.NOW // Define o valor padrão como o timestamp atual no momento da criação.
    }
    // As colunas `id_medicamento`, `hospital_origem` e `hospital_destino`
    // serão criadas automaticamente quando as associações forem definidas.
}, {
    tableName: 'transacoes', // Nome da tabela no banco de dados.
    timestamps: false        // Desabilita as colunas `createdAt` e `updatedAt` do Sequelize,
                             // pois `data_transacao` já gerencia o timestamp.
});

export default Transacao; // Exporta o modelo Transacao.
