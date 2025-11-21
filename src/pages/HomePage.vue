<template>
  <section class="flex flex-col justify-between items-center h-full bg-gray-100 px-6">
    <div class="flex flex-col justify-end items-center h-1/3">
      <h1 class="text-xl font-bold mb-4">استعلام قیمت بیمه خودرو</h1>
      <PlateForm @submit="handleSubmit" />
    </div>

    <div class="flex-1 w-full">
      <template v-if="data">
        <hr class="w-full border-t border-gray-200 my-6" />
        <InqueryDetailCard v-bind="data" />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlateForm from '@/components/PlateForm.vue'
import useInquery from '@/composables/inquery/useInquery'
import type { InqueryTransformed } from '@/composables/inquery'
import InqueryDetailCard from '@/components/InqueryDetailCard.vue'

const data = ref<InqueryTransformed | null>(null)

const { getVehicleInfoByPlate } = useInquery()

const handleSubmit = async (plate: string) => {
  data.value = (await getVehicleInfoByPlate(plate)) as InqueryTransformed
}
</script>
