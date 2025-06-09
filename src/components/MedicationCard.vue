<template>
  <div 
    :class="`${medication.color} ${medication.textColor} p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer min-h-[120px] flex flex-col justify-between`"
  >
    <div>
      <h3 class="font-bold text-sm mb-1">{{ medication.name }}</h3>
      <p v-if="medication.description" class="text-xs opacity-90 mb-2">
        {{ medication.description }}
      </p>
      <p v-if="medication.dosage" class="text-lg font-bold">
        {{ medication.dosage }}
      </p>
    </div>
    
    <!-- Medication icon in bottom right -->
    <div class="flex justify-end">
      <div class="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <!-- Pill Icon -->
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.22 11.29l6.59-6.59C11.42 4.08 12.2 3.75 13 3.75s1.58.33 2.19.95L20.78 10.29c1.28 1.28 1.28 3.36 0 4.64L14.19 21.52c-.61.61-1.39.95-2.19.95s-1.58-.33-2.19-.95L3.22 15.93c-1.28-1.28-1.28-3.36 0-4.64zM13 6.25c-.4 0-.77.16-1.06.44L5.35 13.28c-.58.58-.58 1.54 0 2.12l6.59 6.59c.29.29.66.44 1.06.44s.77-.16 1.06-.44l6.59-6.59c.58-.58.58-1.54 0-2.12L14.06 6.69c-.29-.29-.66-.44-1.06-.44z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Medication {
  id: number
  name: string
  description: string
  dosage: string
  color: string
  textColor: string
}

defineProps<{
  medication: Medication
}>()
</script>