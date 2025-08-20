import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  actions: {
    async login(email, password) {
      try {
  const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error('Credenciais inválidas')
        }

        const data = await response.json()
        
        this.user = data.user
        this.token = data.token
        this.isAuthenticated = true

        // Armazenar no localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        return data
      } catch (error) {
        throw error
      }
    },

    async loginHospital(email, password) {
      try {
  const response = await fetch('http://localhost:3000/api/auth/login-hospital', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error('Credenciais inválidas')
        }

        const data = await response.json()
        
        this.user = data.user
        this.token = data.token
        this.isAuthenticated = true

        // Armazenar no localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        return data
      } catch (error) {
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Remover do localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    // Verificar se há um token salvo no localStorage
    checkAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    }
  }
})

