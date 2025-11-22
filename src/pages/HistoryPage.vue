<template>
  <div class="bg-gray-100 px-6 pb-6 h-full overflow-y-auto">
    <template v-if="inqueries.length > 0">
      <h1 class="text-xl font-bold pt-6 bg-gray-100">تاریخچه استعلام قیمت بیمه خودرو</h1>
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
      <RouterLink to="/">
        <UButton color="info" size="md">استعلام قیمت بیمه خودرو</UButton>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UButton } from '@/components/ui'
import type { InqueryTransformed } from '@/composables/inquery/inquery.types'
import { getAll, remove } from '@/providers/indexedDb'
import InqueryListCard from '@/components/InqueryListCard.vue'

type InqueryListItem = InqueryTransformed & { plateEn: string; createdAt?: number | string }

const inqueries = ref<InqueryListItem[]>([])

onMounted(async () => {
  const records = (await getAll()) as Array<{ plate: string } & Partial<InqueryListItem>>
  inqueries.value = records.map((inquiry) => ({
    ...(inquiry as InqueryListItem),
    plate: JSON.parse(inquiry.plate as string),
  }))
})

const removeInquery = (plateEn: string) => {
  remove(plateEn)
  inqueries.value = inqueries.value.filter((inquiry) => inquiry.plateEn !== plateEn)
}
</script>
