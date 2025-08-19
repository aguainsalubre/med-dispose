// Middleware de autenticação JWT para verificar tokens de usuário

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware para verificar se o usuário está autenticado
export const authenticateToken = async (req, res, next) => {
    try {
        // Obter o token do cabeçalho Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                error: 'Token de acesso requerido' 
            });
        }

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Buscar o usuário no banco de dados
        const user = await User.findByPk(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ 
                error: 'Usuário não encontrado' 
            });
        }

        // Adicionar informações do usuário à requisição
        req.user = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo_usuario: user.tipo_usuario
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: 'Token inválido' 
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Token expirado' 
            });
        }

        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
};

// Middleware opcional para verificar se o usuário é de um tipo específico
export const requireUserType = (allowedTypes) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                error: 'Usuário não autenticado' 
            });
        }

        if (!allowedTypes.includes(req.user.tipo_usuario)) {
            return res.status(403).json({ 
                error: 'Acesso negado: tipo de usuário não autorizado' 
            });
        }

        next();
    };
};

