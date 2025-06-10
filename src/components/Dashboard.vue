<template>
  <div class="min-h-screen bg-gray-50 pt-20 px-4 pb-24">
    <!-- Greeting -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Olá!</h1>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Chart 1 - Medicamentos Cedidos -->
      <ChartCard
        title="Gráfico Semanal"
        subtitle="20 Medicamentos cedidos"
        date="Terça-feira, 6 de Maio"
        :data="chartData.cedidos"
        color="bg-blue-500"
      />

      <!-- Chart 2 - Medicamentos Recebidos -->
      <ChartCard
        title="Gráfico Semanal"
        subtitle="20 Medicamentos recebidos"
        date="Terça-feira, 6 de Maio"
        :data="chartData.recebidos"
        color="bg-blue-500"
      />

      <!-- Chart 3 - Medicamentos Descartados -->
      <ChartCard
        title="Gráfico Semanal"
        subtitle="20 Medicamentos descartados"
        date="Terça-feira, 6 de Maio"
        :data="chartData.descartados"
        color="bg-blue-500"
      />
    </div>

    <!-- Show All Button -->
    <div class="flex justify-end mb-8">
      <button class="text-blue-600 hover:text-blue-700 font-medium transition-colors">
        Show all
      </button>
    </div>

    <!-- Contributions Section -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-2">
          <h2 class="text-lg font-semibold text-gray-900">Contribuições</h2>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>

      <!-- Contribution Item -->
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span class="text-white font-bold text-sm">Unimed</span>
        </div>
        <div class="flex-1">
          <h3 class="font-medium text-gray-900 mb-1">Unimed Itajubá</h3>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-orange-400 h-2 rounded-full" style="width: 75%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChartCard from './ChartCard.vue'

const chartData = ref({
  cedidos: [5, 8, 12, 6, 20, 15, 10],
  recebidos: [3, 6, 9, 4, 18, 12, 8],
  descartados: [2, 4, 7, 3, 16, 9, 6]
})

// Simular carregamento de dados
onMounted(() => {
  // Aqui você faria a chamada para a API
  loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    // Exemplo de como seria a chamada para a API
    // const response = await fetch('/api/dashboard')
    // const data = await response.json()
    // chartData.value = data
    console.log('Dados do dashboard carregados')
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
  }
}
</script>