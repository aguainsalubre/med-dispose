<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
          <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Faça login para acessar o sistema</h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            v-model="email"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            v-model="password"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="••••••••"
          />
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">{{ errorMessage }}</div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </div>
      </form>

      <div class="text-center text-sm text-gray-600">
        <p>Credenciais de teste:</p>
        <p>Admin: <strong>admin@medispose.com</strong> / <strong>password</strong></p>
        <p>Usuário: <strong>user@medispose.com</strong> / <strong>password</strong></p>
      </div>

      <div class="text-center">
        <router-link 
          to="/cadastro-hospital" 
          class="text-blue-600 hover:text-blue-500 text-sm font-medium"
        >
          Não tem uma conta? Cadastre seu hospital
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    // Primeiro tenta login como hospital
    try {
      await authStore.loginHospital(email.value, password.value);
      router.push('/dashboard'); // Redireciona para o dashboard após o login
      return;
    } catch (hospitalError) {
      // Se falhar como hospital, tenta como usuário admin
      try {
        await authStore.login(email.value, password.value);
        router.push('/dashboard'); // Redireciona para o dashboard após o login
        return;
      } catch (adminError) {
        // Se ambos falharem, mostra erro
        throw new Error('Credenciais inválidas');
      }
    }
  } catch (error) {
    errorMessage.value = error.message || 'Erro ao fazer login. Tente novamente.';
  }
};
</script>


