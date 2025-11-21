<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black/70" @click.self="handleOverlayClick" />
        <div ref="dialogContainer" class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-200 ease"
            enter-from-class="opacity-0 scale-95"
            leave-active-class="transition-all duration-200 ease"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="modelValue"
              ref="dialogContent"
              class="relative z-10 bg-white shadow-xl rounded-md"
              @click.stop
            >
              <div
                class="dialog-content"
                :class="{
                  'p-4 pt-0': padded,
                  'p-0': !padded,
                }"
              >
                <div class="p-4">
                  <slot />
                </div>

                <div class="flex flex-row justify-between gap-x-2 mt-4">
                  <button
                    class="px-4 py-2 w-full text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300"
                    @click="confirm"
                  >
                    تایید
                  </button>
                  <button
                    @click="close"
                    class="px-4 py-2 w-full bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-all duration-300"
                  >
                    انصراف
                  </button>
                </div>
              </div>

              <div v-if="$slots.footer" class="mt-4 flex justify-end space-x-2">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    padded?: boolean
    title?: string
    hideCloseButton?: boolean
    closeOnClickOutside?: boolean
    closeOnEsc?: boolean
    lockScroll?: boolean
    maxWidth?: string
  }>(),
  {
    padded: true,
    title: '',
    hideCloseButton: false,
    closeOnClickOutside: true,
    closeOnEsc: true,
    lockScroll: false,
    maxWidth: 'max-w-fit',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'confirm'): void
}>()

const dialogContent = ref<HTMLElement | null>(null)

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const confirm = () => {
  emit('confirm')
}

const handleOverlayClick = (event: MouseEvent) => {
  if (!props.closeOnClickOutside) return
  if (dialogContent.value && !dialogContent.value.contains(event.target as Node)) {
    close()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
