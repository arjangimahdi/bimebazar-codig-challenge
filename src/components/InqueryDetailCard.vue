<template>
  <div class="flex flex-col bg-white rounded-md p-4 w-full">
    <div class="flex flex-col">
      <h3 class="text-base font-bold mb-4">مشخصات خودرو</h3>
      <div class="flex flex-row justify-between items-center mb-2">
        <span class="text-sm"> {{ brand }} {{ model }} </span>
        <span class="text-sm"> سال ساخت :‌ {{ modelYear }} </span>
      </div>

      <Plate :plate="plate" class="w-fit ms-auto" />

      <hr class="w-full border-t border-gray-200 my-4" />

      <div class="flex flex-col">
        <h3 class="text-base font-bold mb-4">مشخصات مالک</h3>
        <div class="flex flex-row justify-between items-center">
          <span class="text-sm">
            {{ ownerFullName }}
          </span>
          <span class="text-sm"> کدملی : {{ ownerNationalId }} </span>
        </div>
      </div>

      <div class="flex flex-row justify-between items-center bg-green-100 p-3 rounded-md mt-6">
        <div class="flex flex-col text-green-800">
          <span class="text-xs font-bold mb-1">قیمت سالانه بیمه </span>
          <span class="text-sm font-bold"> {{ annualInsurancePrice }} ریال </span>
        </div>

        <button class="text-sm bg-green-800 text-white px-4 py-2 rounded-md">خرید بیمه</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Plate from '@/components/Plate.vue'
import type { InqueryTransformed } from '@/composables/inquery/types'
defineProps<InqueryTransformed>()
</script>
