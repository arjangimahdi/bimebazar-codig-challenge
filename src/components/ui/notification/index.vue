<template>
  <Transition name="fade">
    <div v-if="visible" :class="['', wrapperClass]">
      <div :class="classes" role="alert" aria-live="polite">
        <div class="flex-1">
          <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
          <p class="text-sm leading-6">{{ message }}</p>
        </div>
        <UButton
          type="button"
          variant="ghost"
          color="error"
          size="sm"
          @click="close"
          aria-label="بستن اعلان"
        >
          <Icon icon="mdi:close" class="w-5 h-5" aria-hidden="true" />
        </UButton>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineOptions({ name: 'UNotification' })
import { Icon } from '@iconify/vue'
import UButton from '@/components/ui/button/index.vue'
import { useNotification } from './useNotification'
import type { NotificationProps } from './notification.types'

const props = withDefaults(defineProps<NotificationProps>(), {
  title: '',
  type: 'info',
  timeout: 3000,
  show: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { classes, visible, clearTimer } = useNotification(props as Required<NotificationProps>)

function close() {
  clearTimer()
  emit('close')
}

const wrapperClass = 'fixed top-4 right-4 z-50 max-w-xs w-[90vw] sm:w-96 pointer-events-auto'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
