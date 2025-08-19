<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar 
      :isOpen="sidebarOpen" 
      @close="closeSidebar"
      @navigate="handleNavigation"
    />
    
    <!-- Header -->
    <Header @toggleMenu="toggleSidebar" />
    
    <!-- Main Content -->
    <main class="pt-20 px-4 pb-24">
      <!-- Greeting -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Olá!</h1>
      </div>

      <!-- Recent Hospitals Section -->
      <RecentHospitals />

      <!-- Expiring Medications Section -->
      <ExpiringMedications />
    </main>

    <!-- Floating Action Button -->
    <FloatingActionButton />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import RecentHospitals from './RecentHospitals.vue'
import ExpiringMedications from './ExpiringMedications.vue'
import FloatingActionButton from './FloatingActionButton.vue'

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const handleNavigation = (page) => {
  console.log(`Navegando para: ${page}`)
  // Aqui você pode implementar a navegação entre páginas
  switch (page) {
    case 'dashboard':
      console.log('Abrindo Dashboard')
      break
    case 'add-medication':
      console.log('Abrindo formulário de adicionar remédios')
      break
    case 'hospitals':
      console.log('Abrindo lista de hospitais')
      break
    case 'medications':
      console.log('Abrindo lista de medicamentos')
      break
    default:
      console.log('Página não encontrada')
  }
}
</script>