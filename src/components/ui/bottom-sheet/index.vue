<template>
  <teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300 ease"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-300 ease"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 bg-black/50 z-40" @click="close" />
    </transition>

    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full"
      leave-active-class="transition-transform duration-300 ease-out"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="modelValue"
        ref="sheet"
        class="fixed bottom-0 inset-x-0 z-50 bg-white shadow-xl rounded-t-xl overflow-hidden"
        :style="dragging ? { transform: `translateY(${translateY}px)` } : {}"
        @touchstart.passive="onTouchStart"
        @touchmove="onTouchMove"
        @touchend.passive="onTouchEnd"
      >
        <div class="w-full p-4 bg-gray-100 flex justify-center">
          <div class="w-8 h-1 bg-gray-500 rounded-full" />
        </div>
        <div class="overflow-y-auto max-h-[80vh]" :class="{ 'p-4': padded }">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineOptions({ name: 'UBottomSheet' })
import type { BottomSheetProps, BottomSheetEmits } from './bottom-sheet.types'
import { useBottomSheet } from './useBottomSheet'

const props = withDefaults(defineProps<BottomSheetProps>(), {
  modelValue: false,
  padded: true,
  lockScroll: false,
})
const emit = defineEmits<BottomSheetEmits>()

const { dragging, translateY, close, onTouchStart, onTouchMove, onTouchEnd } = useBottomSheet(
  props as Required<BottomSheetProps>,
  emit,
)
</script>
