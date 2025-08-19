<template>
  <div class="flex flex-col items-center w-40 pt-6">
    <div class="hover:cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
      <img
        v-if="hospital.image"
        :src="hospital.image"
        alt="Logo do hospital"
        class="w-full h-full rounded-full object-cover"
      />
      <span v-else class="text-3xl font-bold text-gray-700">{{ hospital.logo || '?' }}</span>
    </div>
      <span class="font-semibold text-center text-base truncate w-full">
    {{ hospital.shortName || hospital.name || 'Sem nome' }}
  </span>
  </div>
</template>

<script setup>
defineProps({
  hospital: {
    type: Object,
    required: true,
    default: () => ({ color: '', name: '', shortName: '', logo: '', image: '' })
  }
})
</script>