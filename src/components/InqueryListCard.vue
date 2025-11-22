<template>
  <div class="bg-white rounded-md p-4 flex flex-col gap-y-2">
    <div
      class="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between justify-start gap-y-2"
    >
      <div class="flex flex-col gap-y-1">
        <span class="text-base font-bold"> {{ inquiry.brand }} {{ inquiry.model }} </span>
        <span class="text-xs text-gray-500"> {{ inquiry.createdAt }} </span>
      </div>
      <PlateNumber :plate="inquiry.plate" />
    </div>
    <div class="flex items-center justify-end gap-x-2">
      <UButton size="sm" variant="outline" color="error" @click="confirmationFlag = true">
        حذف استعلام
      </UButton>
      <UButton size="sm" variant="outline" color="info" @click="modalFlag = true">
        مشاهده بیشتر
      </UButton>
    </div>
    <UBottomSheet v-if="isMobile" v-model="modalFlag" :padded="false">
      <InqueryDetailCard :inquiry="inquiry" class="min-w-full" />
    </UBottomSheet>
    <UModal v-else v-model="modalFlag" title="اطلاعات استعلام" :padded="false">
      <InqueryDetailCard :inquiry="inquiry" class="min-w-sm" />
    </UModal>

    <UConfirmationDialog
      v-if="confirmationFlag"
      v-model="confirmationFlag"
      title="حذف استعلام"
      @confirm="deleteInquiry"
    >
      <p>آیا می خواهید استعلام خود را حذف کنید؟</p>
    </UConfirmationDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

import PlateNumber from '@/components/PlateNumber.vue'
import InqueryDetailCard from '@/components/InqueryDetailCard.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { UButton } from '@/components/ui'

const UModal = defineAsyncComponent(() => import('@/components/ui/modal/index.vue'))
const UBottomSheet = defineAsyncComponent(() => import('@/components/ui/bottom-sheet/index.vue'))
const UConfirmationDialog = defineAsyncComponent(() => import('@/components/ui/dialog/index.vue'))

import type { InqueryTransformed } from '@/composables/inquery/inquery.types'

interface Props {
  inquiry: InqueryTransformed & { plateEn: string; createdAt?: number | string }
}

interface Emits {
  (e: 'delete', plateEn: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')

const modalFlag = ref(false)
const confirmationFlag = ref(false)

const deleteInquiry = () => {
  confirmationFlag.value = false
  emit('delete', props.inquiry.plateEn)
}
</script>
