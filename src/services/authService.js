// Serviço de API para gerenciar autenticação no frontend

const API_BASE_URL = 'http://localhost:3000/api/auth';

class AuthService {
    constructor() {
        this.token = localStorage.getItem('token');
    }

    // Configurar cabeçalhos da requisição
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Fazer requisição HTTP
    async makeRequest(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...this.getHeaders(),
                    ...options.headers,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // Registrar novo usuário
    async register(userData) {
        const data = await this.makeRequest(`${API_BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        if (data.token) {
            this.setToken(data.token);
        }

        return data;
    }

    // Fazer login
    async login(credentials) {
        const data = await this.makeRequest(`${API_BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        if (data.token) {
            this.setToken(data.token);
        }

        return data;
    }

    // Fazer logout
    async logout() {
        try {
            await this.makeRequest(`${API_BASE_URL}/logout`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('Erro no logout:', error);
        } finally {
            this.removeToken();
        }
    }

    // Obter perfil do usuário
    async getProfile() {
        return await this.makeRequest(`${API_BASE_URL}/profile`);
    }

    // Atualizar senha
    async updatePassword(passwordData) {
        return await this.makeRequest(`${API_BASE_URL}/password`, {
            method: 'PUT',
            body: JSON.stringify(passwordData),
        });
    }

    // Excluir conta
    async deleteAccount() {
        const data = await this.makeRequest(`${API_BASE_URL}/account`, {
            method: 'DELETE',
        });

        this.removeToken();
        return data;
    }

    // Definir token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Remover token
    removeToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Verificar se o usuário está autenticado
    isAuthenticated() {
        return !!this.token;
    }

    // Obter token atual
    getToken() {
        return this.token;
    }

    // Decodificar token JWT (simples, sem verificação)
    decodeToken() {
        if (!this.token) return null;

        try {
            const payload = this.token.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            return decoded;
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return null;
        }
    }

    // Verificar se o token está expirado
    isTokenExpired() {
        const decoded = this.decodeToken();
        if (!decoded) return true;

        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    }
}

// Exportar instância única do serviço
export default new AuthService();

