// Controlador de autenticação para gerenciar login, cadastro, logout e exclusão de conta

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

// Função para gerar token JWT
const generateToken = (userId) => {
    return jwt.sign(
        { userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
};

// Registro de novo usuário
export const register = async (req, res) => {
    try {
        // Verificar erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const { nome, email, senha, tipo_usuario } = req.body;

        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                error: 'Usuário já existe com este email'
            });
        }

        // Hash da senha
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        // Criar novo usuário
        const newUser = await User.create({
            nome,
            email,
            senha: hashedPassword,
            tipo_usuario
        });

        // Gerar token JWT
        const token = generateToken(newUser.id);

        // Resposta sem a senha
        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            token,
            user: {
                id: newUser.id,
                nome: newUser.nome,
                email: newUser.email,
                tipo_usuario: newUser.tipo_usuario
            }
        });

    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

// Login de usuário
export const login = async (req, res) => {
    try {
        // Verificar erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const { email, senha } = req.body;

        // Buscar usuário por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                error: 'Email ou senha incorretos'
            });
        }

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Email ou senha incorretos'
            });
        }

        // Gerar token JWT
        const token = generateToken(user.id);

        // Resposta com token e dados do usuário
        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                tipo_usuario: user.tipo_usuario
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

// Logout de usuário (invalidar token no lado cliente)
export const logout = async (req, res) => {
    try {
        // Em uma implementação mais robusta, você poderia manter uma lista negra de tokens
        // Por simplicidade, apenas instruímos o cliente a descartar o token
        res.json({
            message: 'Logout realizado com sucesso'
        });
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

// Obter perfil do usuário autenticado
export const getProfile = async (req, res) => {
    try {
        // req.user é definido pelo middleware de autenticação
        res.json({
            user: req.user
        });
    } catch (error) {
        console.error('Erro ao obter perfil:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

// Exclusão de conta do usuário
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        // Buscar o usuário
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }

        // Excluir o usuário
        await user.destroy();

        res.json({
            message: 'Conta excluída com sucesso'
        });

    } catch (error) {
        console.error('Erro na exclusão de conta:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

// Atualizar senha do usuário
export const updatePassword = async (req, res) => {
    try {
        // Verificar erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const { senhaAtual, novaSenha } = req.body;
        const userId = req.user.id;

        // Buscar o usuário
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }

        // Verificar senha atual
        const isCurrentPasswordValid = await bcrypt.compare(senhaAtual, user.senha);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({
                error: 'Senha atual incorreta'
            });
        }

        // Hash da nova senha
        const saltRounds = 12;
        const hashedNewPassword = await bcrypt.hash(novaSenha, saltRounds);

        // Atualizar senha
        await user.update({ senha: hashedNewPassword });

        res.json({
            message: 'Senha atualizada com sucesso'
        });

    } catch (error) {
        console.error('Erro na atualização de senha:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

