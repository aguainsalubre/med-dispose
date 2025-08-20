<template>
  <header class="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Left side -->
      <div class="flex items-center space-x-4">
        <button 
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          @click="toggleMenu"
        >
          <!-- Menu Icon -->
          <svg class="w-6 h-6 text-gray-700 dark:fill-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <!-- Medical Icon -->
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
          </svg>
        </div>
      </div>

      <!-- Search bar -->
      <div class="flex-1 flex justify-center px-4">
        <input
          type="text"
          placeholder="Pesquisar..."
          class="w-full max-w-lg px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <!-- Right side -->
      <div class="flex items-center space-x-2">
        <button class="p-2 hover:bg-gray-700 rounded-lg transition-colors relative" @click="toggleDark">
          <!-- Lua Icon -->
          <svg class="w-6 h-6 text-gray-700 dark:text-gray-200" fill="yellow" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        </button>
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <!-- Settings Icon -->
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['toggleMenu'])

const toggleMenu = () => {
  emit('toggleMenu')
}

const isDark = ref(false)

const toggleDark = () => {
  // Inverte o valor
  isDark.value = !isDark.value

  // Adiciona ou remove a classe 'dark' do <html>
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Ao carregar, verifica localStorage primeiro, depois preferência do sistema
onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else if (theme === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>