// Este arquivo configura a conexão com o banco de dados MySQL usando o Sequelize.

import dotenv from 'dotenv'; // Usa import para dotenv
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import { Sequelize } from 'sequelize'; // Usa import para Sequelize

// Cria uma nova instância do Sequelize, conectando ao banco de dados MySQL.
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nome do banco de dados (lido de .env, ex: medispose)
    process.env.DB_USER,       // Usuário do banco de dados (lido de .env, ex: root)
    process.env.DB_PASSWORD,   // Senha do usuário do banco de dados (lido de .env)
    {
        host: process.env.DB_HOST, // Endereço do host do banco de dados (lido de .env, ex: localhost)
        port: process.env.DB_PORT, // Porta do MySQL (lido de .env, padrão 3306)
        dialect: 'mysql',          // Define o dialeto do banco de dados para MySQL.
        logging: false             // Desabilita o log de queries SQL no console.
    }
);

export default sequelize; // Usa export default para exportar a instância do Sequelize.
