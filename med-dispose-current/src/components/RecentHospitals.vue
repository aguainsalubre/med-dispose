<template>
  <section class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Hospitais recentes</h2>
      <button class="text-blue-600 hover:text-blue-700 transition-colors">
        <!-- Arrow Right Icon -->
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <div class="flex space-x-4 overflow-x-auto pb-2">
      <HospitalCard 
        v-for="hospital in hospitals" 
        :key="hospital.id"
        :hospital="hospital"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import HospitalCard from './HospitalCard.vue'

const hospitals = ref([
  {
    id: 1,
    name: 'Hospital Antônio Moreira da Co.',
    shortName: 'Antônio Moreira da Co.',
    color: 'bg-cyan-500',
    logo: 'H',
    image: '/images/hamc.png'
  },
  {
    id: 2,
    name: 'Unimed Sul Mineira',
    shortName: 'Unimed Sul Mineira',
    color: 'bg-green-600',
    logo: 'U',
    image: '/images/unimed sul mineira.png'
  },
  {
    id: 3,
    name: 'Unimed Itajubá',
    shortName: 'Unimed Itajubá',
    color: 'bg-green-600',
    logo: 'U',
    image: '/images/unimed itajuba.png'
  },
  {
    id: 4,
    name: 'Hospital Renascentista',
    shortName: 'Hospital Renascentista',
    color: 'bg-blue-500',
    logo: 'R',
    image: '/images/renacentista.png'
  },
  {
    id: 5,
    name: 'Hospital e Maternidade Santa Paula',
    shortName: 'Hospital e Maternidade...',
    color: 'bg-green-700',
    logo: 'M',
    image: '/images/santa paula.png'
  }
])
</script>