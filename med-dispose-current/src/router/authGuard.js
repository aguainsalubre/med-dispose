// Guard de autenticação para proteger rotas que requerem login

import { useAuthStore } from '../stores/auth.js';

// Guard para rotas que requerem autenticação
export const requireAuth = async (to, from, next) => {
    const authStore = useAuthStore();
    
    // Se não está autenticado, tentar inicializar a autenticação
    if (!authStore.isLoggedIn) {
        await authStore.initAuth();
    }
    
    // Se ainda não está autenticado após a inicialização, redirecionar para login
    if (!authStore.isLoggedIn) {
        next({
            path: '/login',
            query: { redirect: to.fullPath } // Salvar a rota de destino para redirecionamento após login
        });
    } else {
        next();
    }
};

// Guard para rotas que requerem usuário não autenticado (login, registro)
export const requireGuest = async (to, from, next) => {
    const authStore = useAuthStore();
    
    // Se não está autenticado, tentar inicializar a autenticação
    if (!authStore.isLoggedIn) {
        await authStore.initAuth();
    }
    
    // Se está autenticado, redirecionar para dashboard
    if (authStore.isLoggedIn) {
        next('/dashboard');
    } else {
        next();
    }
};

// Guard para rotas que requerem tipo específico de usuário
export const requireUserType = (allowedTypes) => {
    return async (to, from, next) => {
        const authStore = useAuthStore();
        
        // Se não está autenticado, tentar inicializar a autenticação
        if (!authStore.isLoggedIn) {
            await authStore.initAuth();
        }
        
        // Se não está autenticado, redirecionar para login
        if (!authStore.isLoggedIn) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
            return;
        }
        
        // Verificar se o tipo de usuário é permitido
        if (!allowedTypes.includes(authStore.currentUser.tipo_usuario)) {
            next({
                path: '/unauthorized',
                query: { message: 'Acesso negado: tipo de usuário não autorizado' }
            });
        } else {
            next();
        }
    };
};

// Guard para rotas que requerem usuário do tipo hospital
export const requireHospital = requireUserType(['hospital']);

// Guard para rotas que requerem usuário do tipo civil
export const requireCivil = requireUserType(['civil']);

