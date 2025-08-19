<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <!-- Logo/Header -->
      <div class="text-center mb-12">
        <div class="mx-auto h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
          <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Med Dispose</h1>
        <p class="text-xl text-gray-600">Escolha como deseja acessar o sistema</p>
      </div>

      <!-- Choice Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <!-- Empresa Card -->
        <div 
          @click="goToEmpresa"
          class="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        >
          <div class="text-center">
            <div class="mx-auto h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <svg class="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Empresa</h2>
            <p class="text-gray-600 mb-6">
              Acesso para hospitais, clínicas e farmácias gerenciarem seus medicamentos e estoques.
            </p>
            <div class="flex items-center justify-center text-blue-600 font-medium">
              <span>Fazer Login</span>
              <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Civil Card -->
        <div 
          @click="goToCivil"
          class="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        >
          <div class="text-center">
            <div class="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
              <svg class="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Civil</h2>
            <p class="text-gray-600 mb-6">
              Encontre farmácias próximas à sua localização para descarte seguro de medicamentos.
            </p>
            <div class="flex items-center justify-center text-green-600 font-medium">
              <span>Ver Mapa</span>
              <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="text-center mt-12">
        <p class="text-gray-500 text-sm">
          Med Dispose - Sistema de gerenciamento e descarte responsável de medicamentos
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToEmpresa = () => {
  router.push('/login')
}

const goToCivil = () => {
  router.push('/mapa')
}
</script>


