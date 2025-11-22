import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { notificationTv } from './notification.theme'
import type { NotificationProps } from './notification.types'

export function useNotification(props: Required<NotificationProps>) {
  const classes = computed(() => notificationTv({ color: props.type }))
  const visible = ref<boolean>(props.show)
  let timer: number | undefined

  function startTimer() {
    clearTimer()
    if (props.timeout && props.timeout > 0) {
      timer = window.setTimeout(() => {
        visible.value = false
      }, props.timeout)
    }
  }

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  watch(
    () => props.show,
    (val) => {
      visible.value = !!val
      if (visible.value) startTimer()
    },
  )

  onMounted(() => {
    if (visible.value) startTimer()
  })
  onBeforeUnmount(() => {
    clearTimer()
  })

  return {
    classes,
    visible,
    clearTimer,
    startTimer,
  }
}
