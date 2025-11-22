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
              class="relative z-10 bg-white shadow-xl"
              @click.stop
            >
              <div
                class="py-3 px-4 flex flex-row justify-between items-center gap-x-1 border-b border-gray-200"
              >
                <slot name="title">
                  <span v-if="title" class="text-base font-bold">
                    {{ title }}
                  </span>
                </slot>
                <UButton
                  v-if="!hideCloseButton"
                  variant="ghost"
                  size="sm"
                  class="p-1 text-xs"
                  aria-label="بستن"
                  @click="close"
                >
                  <Icon icon="mdi:close" class="size-6" />
                </UButton>
              </div>

              <div
                class="dialog-content"
                :class="{
                  'p-4 pt-0': padded,
                  'p-0': !padded,
                }"
              >
                <slot />
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
defineOptions({ name: 'UModal' })
import { Icon } from '@iconify/vue'
import UButton from '@/components/ui/button/index.vue'
import type { ModalProps, ModalEmits } from './modal.types'
import { useModal } from './useModal'

const props = withDefaults(defineProps<ModalProps>(), {
  padded: true,
  title: '',
  hideCloseButton: false,
  closeOnClickOutside: true,
  closeOnEsc: true,
  lockScroll: false,
  maxWidth: 'max-w-fit',
})

const emit = defineEmits<ModalEmits>()

const { dialogContent, close, handleOverlayClick } = useModal(props as Required<ModalProps>, emit)
</script>
