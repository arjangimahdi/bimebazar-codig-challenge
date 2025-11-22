<template>
  <section class="flex flex-col justify-between items-center h-full bg-gray-100 px-6">
    <div class="flex flex-col justify-end items-center h-1/3">
      <h1 class="text-xl font-bold mb-4">استعلام قیمت بیمه خودرو</h1>
      <InqueryForm @submit="handleSubmit" :is-loading="isLoading" />
    </div>

    <div class="flex-1 w-full">
      <template v-if="isLoading">
        <InqueryDetailCardSkeleton class="mt-12" />
      </template>
      <template v-else-if="inqueryDetails">
        <hr class="w-full border-t border-gray-200 my-6" />
        <InqueryDetailCard :inquiry="inqueryDetails" />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import InqueryForm from '@/components/InqueryForm.vue'
import { useInquery } from '@/composables/inquery'
import type { InqueryTransformed } from '@/composables/inquery'
import InqueryDetailCard from '@/components/InqueryDetailCard.vue'
import InqueryDetailCardSkeleton from '@/components/InqueryDetailCardSkeleton.vue'

const inqueryDetails = ref<InqueryTransformed | null>(null)

const { getVehicleInfoByPlate, isLoading } = useInquery()

const handleSubmit = async (plate: string) => {
  inqueryDetails.value = (await getVehicleInfoByPlate(plate)) as InqueryTransformed
}
</script>
