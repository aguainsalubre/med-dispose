<template>
  <div :class="`${medication.color} ${medication.textColor} p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer min-h-[120px] flex flex-col justify-between`">
    <div>
      <h3 class="font-bold text-sm mb-1 dark:text-white">{{ medication.name }}</h3>
      <p v-if="medication.description" class="text-xs opacity-90 mb-2 dark:text-white">
        {{ medication.description }}
      </p>
      <p v-if="medication.dosage" class="text-lg font-bold dark:text-white">
        {{ medication.dosage }}
      </p>
      <p v-if="medication.label" class="text-xs text-gray-500 dark:text-white">
        {{ medication.label }}
      </p>
    </div>
    
    <!-- Medication icon in bottom right -->
    <div class="flex justify-end">
      <div class="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <!-- Pill Icon -->
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.22 11.29l6.59-6.59C11.42 4.08 12.2 3.75 13 3.75s1.58.33 2.19.95L20.78 10.29c1.28 1.28 1.28 3.36 0 4.64L14.19 21.52c-.61.61-1.39.95-2.19.95s-1.58-.33-2.19-.95L3.22 15.93c-1.28-1.28-1.28-3.36 0-4.64z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  medication: Object
})
</script>