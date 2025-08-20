<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
          <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Cadastro de Hospital</h2>
        <p class="mt-2 text-sm text-gray-600">Registre sua instituição no sistema</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleCadastro">
        <div>
          <label for="nome" class="sr-only">Nome do Hospital</label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            v-model="nome"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Nome do Hospital"
          />
        </div>
        
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
            placeholder="hospital@exemplo.com"
          />
        </div>
        
        <div>
          <label for="senha" class="sr-only">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            autocomplete="new-password"
            required
            v-model="senha"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="endereco" class="sr-only">Endereço</label>
          <input
            id="endereco"
            name="endereco"
            type="text"
            v-model="endereco"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Endereço (opcional)"
          />
        </div>

        <div>
          <label for="telefone" class="sr-only">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            v-model="telefone"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Telefone (opcional)"
          />
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-green-600 text-sm text-center">{{ successMessage }}</div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Cadastrando...</span>
            <span v-else>Cadastrar Hospital</span>
          </button>
        </div>
      </form>

      <div class="text-center">
        <router-link 
          to="/login" 
          class="text-blue-600 hover:text-blue-500 text-sm font-medium"
        >
          Já tem uma conta? Faça login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nome = ref('');
const email = ref('');
const senha = ref('');
const endereco = ref('');
const telefone = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const router = useRouter();

const handleCadastro = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
  const response = await fetch('http://localhost:3000/api/auth/cadastro-hospital', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        endereco: endereco.value,
        telefone: telefone.value
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao cadastrar hospital');
    }

    successMessage.value = 'Hospital cadastrado com sucesso! Redirecionando para login...';
    
    // Redirecionar para login após 2 segundos
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (error) {
    errorMessage.value = error.message || 'Erro ao cadastrar hospital. Tente novamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>

