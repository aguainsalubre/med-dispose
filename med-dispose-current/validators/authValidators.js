// Validadores para os endpoints de autenticação usando express-validator

import { body } from 'express-validator';

// Validador para registro de usuário
export const validateRegister = [
    body('nome')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Nome deve ter entre 2 e 100 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Nome deve conter apenas letras e espaços'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Email deve ter um formato válido')
        .normalizeEmail()
        .isLength({ max: 100 })
        .withMessage('Email deve ter no máximo 100 caracteres'),

    body('senha')
        .isLength({ min: 8, max: 128 })
        .withMessage('Senha deve ter entre 8 e 128 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'),

    body('tipo_usuario')
        .isIn(['civil', 'hospital'])
        .withMessage('Tipo de usuário deve ser "civil" ou "hospital"')
];

// Validador para login de usuário
export const validateLogin = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email deve ter um formato válido')
        .normalizeEmail(),

    body('senha')
        .notEmpty()
        .withMessage('Senha é obrigatória')
        .isLength({ min: 1, max: 128 })
        .withMessage('Senha deve ter no máximo 128 caracteres')
];

// Validador para atualização de senha
export const validateUpdatePassword = [
    body('senhaAtual')
        .notEmpty()
        .withMessage('Senha atual é obrigatória')
        .isLength({ min: 1, max: 128 })
        .withMessage('Senha atual deve ter no máximo 128 caracteres'),

    body('novaSenha')
        .isLength({ min: 8, max: 128 })
        .withMessage('Nova senha deve ter entre 8 e 128 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'),

    body('confirmarNovaSenha')
        .custom((value, { req }) => {
            if (value !== req.body.novaSenha) {
                throw new Error('Confirmação de senha não confere');
            }
            return true;
        })
];

