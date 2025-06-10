// Este é o arquivo principal da sua aplicação Node.js.
// Ele configura o servidor Express, a conexão com o banco de dados e as rotas da API.

import dotenv from 'dotenv'; // Carrega as variáveis de ambiente do arquivo .env.
dotenv.config();

import express from 'express'; // Importa o framework Express.
import sequelize from './config/database.js'; // Importa a instância do Sequelize configurada.

// Importa todos os modelos definidos para as tabelas do seu banco de dados.
// NOTA: Certifique-se de que cada um desses arquivos de modelo
// exporta seu modelo usando 'export default NomeDoModelo;'.
import Hospital from './models/Hospital.js';
import User from './models/User.js';
import LocalDescarte from './models/LocalDescarte.js';
import Medicamento from './models/Medicamento.js';
import DemandaMedicamento from './models/DemandaMedicamento.js';
import Transacao from './models/Transacao.js';

const app = express(); // Cria uma instância do aplicativo Express.
const PORT = process.env.PORT || 3000; // Define a porta do servidor.

// Middleware para parsear o corpo das requisições JSON.
app.use(express.json());

// --- Definição das Associações (Relacionamentos entre as tabelas) ---
// Estas associações são cruciais para que o Sequelize crie as chaves estrangeiras
// no banco de dados e para que você possa fazer queries com 'include'.

// Associações para Hospital
Hospital.hasMany(User, {
    foreignKey: 'id_hospital',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Hospital.hasMany(Medicamento, {
    foreignKey: 'id_hospital',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Hospital.hasMany(DemandaMedicamento, {
    foreignKey: 'id_hospital',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Hospital.hasMany(Transacao, {
    as: 'TransacoesOrigem',
    foreignKey: 'hospital_origem',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Hospital.hasMany(Transacao, {
    as: 'TransacoesDestino',
    foreignKey: 'hospital_destino',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Associações para User
User.belongsTo(Hospital, {
    foreignKey: 'id_hospital',
    targetKey: 'id'
});

// Associações para Medicamento
Medicamento.belongsTo(Hospital, {
    foreignKey: 'id_hospital',
    targetKey: 'id'
});
Medicamento.hasMany(Transacao, {
    foreignKey: 'id_medicamento',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Associações para DemandaMedicamento
DemandaMedicamento.belongsTo(Hospital, {
    foreignKey: 'id_hospital',
    targetKey: 'id'
});

// Associações para Transacao
Transacao.belongsTo(Medicamento, {
    foreignKey: 'id_medicamento',
    targetKey: 'id'
});
Transacao.belongsTo(Hospital, {
    as: 'HospitalOrigem',
    foreignKey: 'hospital_origem',
    targetKey: 'id'
});
Transacao.belongsTo(Hospital, {
    as: 'HospitalDestino',
    foreignKey: 'hospital_destino',
    targetKey: 'id'
});

// --- Sincronização do Banco de Dados e Inicialização do Servidor ---

// `sequelize.sync()` criará/atualizará as tabelas no seu banco de dados.
// `alter: true` tenta ajustar o schema existente sem perder dados (bom para desenvolvimento).
// CUIDADO: `force: true` DELETA E RECRIARÁ TODAS AS TABELAS, PERDENDO TODOS OS DADOS!
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Conectado ao MySQL e tabelas sincronizadas!');
        // Inicia o servidor Express APENAS após a conexão bem-sucedida.
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesse a API em: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ou sincronizar com o MySQL:', err);
        process.exit(1); // Encerra a aplicação em caso de falha.
    });

// --- Rotas da API de Exemplo (CRUD) ---

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API Medispose rodando e conectada ao MySQL!');
});

// --- Rotas para Hospitais ---
app.post('/hospitais', async (req, res) => {
    try {
        const hospital = await Hospital.create(req.body);
        res.status(201).json(hospital);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar hospital', error: err.message });
    }
});

app.get('/hospitais', async (req, res) => {
    try {
        const hospitais = await Hospital.findAll({
            include: [
                User,
                Medicamento,
                DemandaMedicamento,
                { model: Transacao, as: 'TransacoesOrigem' },
                { model: Transacao, as: 'TransacoesDestino' }
            ]
        });
        res.json(hospitais);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar hospitais', error: err.message });
    }
});

app.get('/hospitais/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findByPk(req.params.id, {
            include: [User, Medicamento, DemandaMedicamento, { model: Transacao, as: 'TransacoesOrigem' }, { model: Transacao, as: 'TransacoesDestino' }]
        });
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital não encontrado' });
        }
        res.json(hospital);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar hospital', error: err.message });
    }
});

app.put('/hospitais/:id', async (req, res) => {
    try {
        const [updatedRows] = await Hospital.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Hospital não encontrado ou nenhum dado para atualizar' });
        }
        const updatedHospital = await Hospital.findByPk(req.params.id);
        res.json(updatedHospital);
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao atualizar hospital', error: err.message });
    }
});

app.delete('/hospitais/:id', async (req, res) => {
    try {
        const deletedRows = await Hospital.destroy({
            where: { id: req.params.id }
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Hospital não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar hospital', error: err.message });
    }
});

// --- Rotas para Usuários ---
app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await User.create(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar usuário', error: err.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await User.findAll({
            include: [Hospital]
        });
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: err.message });
    }
});

app.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id, {
            include: [Hospital]
        });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const [updatedRows] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou nenhum dado para atualizar' });
        }
        const updatedUser = await User.findByPk(req.params.id);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao atualizar usuário', error: err.message });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const deletedRows = await User.destroy({
            where: { id: req.params.id }
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
    }
});

// Adicione rotas similares para LocalDescarte, Medicamento, DemandaMedicamento e Transacao.
// O padrão é o mesmo: .create, .findAll, .findByPk, .update, .destroy
