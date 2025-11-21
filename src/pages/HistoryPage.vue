<template>
  <div class="bg-gray-100 px-6 h-full overflow-y-auto">
    <template v-if="inqueries.length > 0">
      <h1 class="text-xl font-bold py-6 sticky top-0 bg-gray-100">
        تاریخچه استعلام قیمت بیمه خودرو
      </h1>
      <InqueryListCard
        class="mt-4"
        v-for="inquiry in inqueries"
        :key="inquiry.plateEn"
        :inquiry="inquiry"
        @delete="removeInquery"
      />
    </template>
    <div v-else class="flex flex-col justify-center items-center h-full gap-y-4">
      <p class="text-gray-500 text-base">هیچ استعلامی ثبت نشده است</p>
      <RouterLink
        to="/"
        class="w-fit px-4 py-2 bg-blue-500 text-sm text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300"
        >استعلام قیمت بیمه خودرو</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { InqueryTransformed } from '@/composables/inquery/types'
import { getAll, remove } from '@/providers/indexedDb'
import InqueryListCard from '@/components/InqueryListCard.vue'
const inqueries = ref<InqueryTransformed[]>([])

onMounted(async () => {
  inqueries.value = (await getAll()).map(
    (inquiry) => ({ ...inquiry, plate: JSON.parse(inquiry.plate as string) }) as InqueryTransformed,
  )
})

const removeInquery = (plateEn: string) => {
  remove(plateEn)
  inqueries.value = inqueries.value.filter((inquiry) => inquiry.plateEn !== plateEn)
}
</script>
