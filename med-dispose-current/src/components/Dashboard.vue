
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
    <FloatingActionButton @click="openAddMedication" />
    <!-- Add Medication Modal -->
    <AddMedicationModal :show="showAddMedication" :token="authToken" @close="closeAddMedication" @added="onMedicationAdded" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import RecentHospitals from './RecentHospitals.vue'
import ExpiringMedications from './ExpiringMedications.vue'
import FloatingActionButton from './FloatingActionButton.vue'
import AddMedicationModal from './AddMedicationModal.vue'
import { useAuthStore } from '../stores/auth'

const sidebarOpen = ref(false)
const showAddMedication = ref(false)
const authStore = useAuthStore()
const authToken = computed(() => authStore.token || localStorage.getItem('token'))

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const openAddMedication = () => {
  showAddMedication.value = true
}

const closeAddMedication = () => {
  showAddMedication.value = false
}

const handleNavigation = (page) => {
  switch (page) {
    case 'dashboard':
      break
    case 'add-medication':
      openAddMedication()
      break
    case 'hospitals':
      break
    case 'medications':
      break
    default:
      break
  }
}

const onMedicationAdded = (med) => {
  // Optionally refresh medication lists or show a toast
}
</script>