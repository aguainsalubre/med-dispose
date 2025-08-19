<template>
  <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <!-- Chart Icon -->
    <div class="flex items-center mb-4">
      <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      </div>
      <h3 class="font-semibold text-gray-900">{{ title }}</h3>
    </div>

    <!-- Chart Info -->
    <div class="mb-4">
      <p class="font-medium text-gray-900 mb-1">{{ subtitle }}</p>
      <p class="text-sm text-gray-500">{{ date }}</p>
    </div>

    <!-- Simple Chart Visualization -->
    <div class="mb-6">
      <div class="flex items-end justify-between h-24 space-x-1">
        <div 
          v-for="(value, index) in data" 
          :key="index"
          class="bg-gray-200 rounded-t flex-1 transition-all duration-300 hover:bg-gray-300"
          :style="{ height: `${(value / Math.max(...data)) * 100}%` }"
          :class="{ [color]: value === Math.max(...data) }"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-gray-400 mt-2">
        <span>0</span>
        <span>15</span>
        <span>30</span>
      </div>
    </div>

    <!-- Details Button -->
    <button class="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">
      Detalhes
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  date: String,
  data: Array,
  color: String
})
</script>