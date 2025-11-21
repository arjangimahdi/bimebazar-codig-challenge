<template>
  <Transition name="fade">
    <div
      v-if="visible"
      :class="['fixed top-4 right-4 z-50 max-w-xs w-[90vw] sm:w-96', wrapperClass]"
    >
      <div
        :class="[
          'flex items-start gap-3 p-4 border rounded-lg shadow-md',
          colorClasses.bg,
          colorClasses.border,
          colorClasses.text,
        ]"
        role="alert"
        aria-live="polite"
      >
        <div class="flex-1">
          <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
          <p class="text-sm leading-6">{{ message }}</p>
        </div>
        <button
          type="button"
          class="ml-2 text-current/70 hover:text-current focus:outline-none cursor-pointer"
          @click="close"
          aria-label="بستن اعلان"
        >
          <Icon icon="mdi:close" class="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineOptions({ name: 'UiNotification' })
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'neutral'

const props = withDefaults(
  defineProps<{
    title?: string
    message: string
    type?: NotificationType
    timeout?: number
    show?: boolean
  }>(),
  {
    title: '',
    type: 'info',
    timeout: 3000,
    show: true,
  },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const visible = ref<boolean>(props.show)
let timer: number | undefined

watch(
  () => props.show,
  (val) => {
    visible.value = !!val
    if (visible.value) startTimer()
  },
)

function startTimer() {
  clearTimer()
  if (props.timeout && props.timeout > 0) {
    timer = window.setTimeout(() => {
      close()
    }, props.timeout)
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = undefined
  }
}

function close() {
  clearTimer()
  visible.value = false
  emit('close')
}

onMounted(() => {
  if (visible.value) startTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})

const colorClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' }
    case 'error':
      return { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' }
    case 'warning':
      return { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' }
    case 'info':
      return { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' }
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' }
  }
})

const wrapperClass = 'pointer-events-auto'
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
