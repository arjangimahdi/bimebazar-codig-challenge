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
                  <UButton block color="error" @click="confirm">تایید</UButton>
                  <UButton block color="gray" @click="close">انصراف</UButton>
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
defineOptions({ name: 'UDialog' })
import UButton from '@/components/ui/button/index.vue'
import type { DialogProps, DialogEmits } from './dialog.types'
import { useDialog } from './useDialog'

const props = withDefaults(defineProps<DialogProps>(), {
  padded: true,
  title: '',
  hideCloseButton: false,
  closeOnClickOutside: true,
  closeOnEsc: true,
  lockScroll: false,
  maxWidth: 'max-w-fit',
})

const emit = defineEmits<DialogEmits>()
const { dialogContent, close, confirm, handleOverlayClick } = useDialog(
  props as Required<DialogProps>,
  emit,
)
</script>
