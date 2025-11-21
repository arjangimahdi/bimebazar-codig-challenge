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
import { ref } from 'vue'

interface Props {
  modelValue?: boolean
  padded?: boolean
  lockScroll?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  padded: true,
  lockScroll: false,
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const startY = ref(0)
const translateY = ref(0)
const dragging = ref(false)
const threshold = 100

function onTouchStart(e: TouchEvent) {
  if (e.touches[0]) {
    startY.value = e.touches[0].clientY
    dragging.value = true
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches[0] && dragging.value) {
    e.preventDefault()
    const delta = e.touches[0].clientY - startY.value
    translateY.value = delta > 0 ? delta : 0
  }
}

function onTouchEnd() {
  if (translateY.value > threshold) {
    close()
  }
  translateY.value = 0
  dragging.value = false
}
</script>
