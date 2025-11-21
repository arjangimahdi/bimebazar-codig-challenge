<template>
  <div class="bg-white rounded-md p-4 flex flex-col gap-y-2">
    <div
      class="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between justify-start gap-y-2"
    >
      <div class="flex flex-col gap-y-1">
        <span class="text-base font-bold"> {{ inquiry.brand }} {{ inquiry.model }} </span>
        <span class="text-xs text-gray-500"> {{ inquiry.createdAt }} </span>
      </div>
      <Plate :plate="inquiry.plate" />
    </div>
    <div class="flex items-center justify-end gap-x-2">
      <button
        @click="confirmationFlag = true"
        class="px-2 py-1 text-xs bg-transparent text-red-600 border border-red-600 rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300"
      >
        حذف استعلام
      </button>
      <button
        @click="modalFlag = true"
        class="px-2 py-1 text-xs bg-transparent text-blue-600 border border-blue-600 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300"
      >
        مشاهده بیشتر
      </button>
    </div>
    <BottomSheet v-if="isMobile" v-model="modalFlag" title="اطلاعات استعلام" :padded="false">
      <InqueryDetailCard :inquiry="inquiry" class="min-w-full" />
    </BottomSheet>
    <Modal v-else v-model="modalFlag" title="اطلاعات استعلام" :padded="false">
      <InqueryDetailCard :inquiry="inquiry" class="min-w-sm" />
    </Modal>

    <ConfirmationDialog
      v-if="confirmationFlag"
      v-model="confirmationFlag"
      title="حذف استعلام"
      @confirm="deleteInquiry"
    >
      <p>آیا می خواهید استعلام خود را حذف کنید؟</p>
    </ConfirmationDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
const Modal = defineAsyncComponent(() => import('@/components/Modal.vue'))
const BottomSheet = defineAsyncComponent(() => import('@/components/BottomSheet.vue'))
const ConfirmationDialog = defineAsyncComponent(() => import('@/components/ConfirmationDialog.vue'))
import Plate from '@/components/Plate.vue'
import type { InqueryTransformed } from '@/composables/inquery/types'
import InqueryDetailCard from '@/components/InqueryDetailCard.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('md')

const props = defineProps<{
  inquiry: InqueryTransformed
}>()

const emit = defineEmits<{
  (e: 'delete', plateEn: string): void
}>()

const modalFlag = ref(false)
const confirmationFlag = ref(false)

const deleteInquiry = () => {
  confirmationFlag.value = false
  emit('delete', props.inquiry.plateEn)
}
</script>
