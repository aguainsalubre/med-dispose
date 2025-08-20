<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
      <button @click="close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Adicionar Medicamento</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input v-model="nome" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Nome do medicamento" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <input v-model="categoria" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Categoria" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
          <input v-model.number="quantidade" type="number" min="1" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Quantidade" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento</label>
          <input v-model="dataVencimento" type="date" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div v-if="errorMessage" class="text-red-600 text-sm text-center">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-green-600 text-sm text-center">{{ successMessage }}</div>
        <button type="submit" :disabled="isLoading" class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isLoading">Adicionando...</span>
          <span v-else>Adicionar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  token: String
})
const emit = defineEmits(['close', 'added'])

const nome = ref('')
const categoria = ref('')
const quantidade = ref(1)
const dataVencimento = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const close = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  nome.value = ''
  categoria.value = ''
  quantidade.value = 1
  dataVencimento.value = ''
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = false
}

watch(() => props.show, (val) => {
  if (!val) resetForm()
})

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:3000/api/medications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({
        nome: nome.value,
        categoria: categoria.value,
        quantidade: quantidade.value,
        dataVencimento: dataVencimento.value
      })
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao adicionar medicamento')
    }
    successMessage.value = 'Medicamento adicionado com sucesso!'
    emit('added', data.data)
    setTimeout(() => {
      close()
    }, 1200)
  } catch (error) {
    errorMessage.value = error.message || 'Erro ao adicionar medicamento.'
  } finally {
    isLoading.value = false
  }
}
</script>
