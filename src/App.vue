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
    <main v-if="currentPage === 'home'">
      <div class="pt-20 px-4 pb-24">
        <!-- Greeting -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Olá!</h1>
        </div>

        <!-- Recent Hospitals Section -->
        <RecentHospitals />

        <!-- Expiring Medications Section -->
        <ExpiringMedications />
      </div>
    </main>

    <!-- Dashboard Page -->
    <Dashboard v-if="currentPage === 'dashboard'" />

    <!-- Floating Action Button -->
    <FloatingActionButton />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import RecentHospitals from './components/RecentHospitals.vue'
import ExpiringMedications from './components/ExpiringMedications.vue'
import FloatingActionButton from './components/FloatingActionButton.vue'
import Dashboard from './components/Dashboard.vue'

const sidebarOpen = ref(false)
const currentPage = ref('home')

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const handleNavigation = (page) => {
  console.log(`Navegando para: ${page}`)
  currentPage.value = page
  closeSidebar()
  
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
    case 'home':
      console.log('Voltando para home')
      break
    default:
      console.log('Página não encontrada')
  }
}
</script>