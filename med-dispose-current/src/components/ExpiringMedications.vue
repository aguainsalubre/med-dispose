<template>
  <section class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Lotes a expirar...</h2>
      <button class="text-blue-600 hover:text-blue-700 transition-colors">
        <!-- Arrow Right Icon -->
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <MedicationCard 
        v-for="medication in medications" 
        :key="medication.id"
        :medication="medication"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import MedicationCard from './MedicationCard.vue'

const medications = ref([
  {
    id: 1,
    name: 'Dipirona sódica',
    description: '30 comprimidos',
    dosage: '500mg',
    color: 'bg-gradient-to-br from-purple-600 to-green-500',
    textColor: 'text-gray-800',
    label:'Neo Química'
  },
  {
    id: 2,
    name: 'Paracetamol',
    description: '20 comprimidos',
    dosage: '750mg',
    color: 'bg-gradient-to-br from-pink-400 to-purple-300',
    textColor: 'text-gray-800',
    label: 'Teuto'
  },
  {
    id: 3,
    name: 'Loratadina',
    description: '100mL + 1 copo dosador',
    dosage: '1mg/mL',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    textColor: 'text-gray-800',
    label: 'CIMED'
  },
  {
    id: 4,
    name: 'Ibuprofeno',
    description: '20 mL',
    dosage: '100mg/mL',
    color: 'bg-gradient-to-br from-red-500 to-pink-400',
    textColor: 'text-gray-800',
    label: 'Medley'
  }
])
</script>