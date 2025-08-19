// Rotas de autenticação para o sistema med-dispose

import express from 'express';
import { 
    register, 
    login, 
    logout, 
    getProfile, 
    deleteAccount, 
    updatePassword 
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { 
    validateRegister, 
    validateLogin, 
    validateUpdatePassword 
} from '../validators/authValidators.js';

const router = express.Router();

// Rota para registro de novo usuário
// POST /api/auth/register
router.post('/register', validateRegister, register);

// Rota para login de usuário
// POST /api/auth/login
router.post('/login', validateLogin, login);

// Rota para logout de usuário
// POST /api/auth/logout
router.post('/logout', logout);

// Rota para obter perfil do usuário autenticado
// GET /api/auth/profile
router.get('/profile', authenticateToken, getProfile);

// Rota para atualizar senha do usuário
// PUT /api/auth/password
router.put('/password', authenticateToken, validateUpdatePassword, updatePassword);

// Rota para exclusão de conta do usuário
// DELETE /api/auth/account
router.delete('/account', authenticateToken, deleteAccount);

export default router;

