<template>
  <button 
    class="fixed bottom-6 left-6 w-14 h-14 bg-pink-500 hover:bg-pink-600 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group z-40"
    @click="$emit('click')"
  >
    <!-- Plus Icon -->
    <svg class="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
  </button>
</template>