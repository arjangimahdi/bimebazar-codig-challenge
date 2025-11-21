<template>
  <div class="flex flex-row-reverse bg-white border-2 border-black rounded-md">
    <div class="flag-vector-container bg-contain bg-center bg-no-repeat" />
    <div class="flex flex-row-reverse items-center">
      <span class="text-base font-bold mx-4 block">
        {{ plate.prefix }}
      </span>
      <span class="text-base font-bold mx-4 block">
        {{ plate.word }}
      </span>
      <span class="text-base font-bold mx-4 block">
        {{ plate.suffix }}
      </span>
    </div>
    <div class="flex flex-col text-center justify-around border-e-2 border-black">
      <span class="text-xs font-bold pt-2"> ایران </span>
      <span class="text-base font-bold mx-4 block">
        {{ plate.code }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PlateValue } from '@/types'

interface Props {
  plate: PlateValue
}

defineProps<Props>()
</script>

<style scoped>
.flag-vector-container {
  width: 28px;
  height: 48px;
  background-image: url('/plate-flag-vector.svg');
}
</style>
