import { onMounted, onUnmounted, ref } from 'vue'
import type { DialogProps, DialogEmits } from './dialog.types'

export function useDialog(props: Readonly<Required<DialogProps>>, emit: DialogEmits) {
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

  return {
    dialogContent,
    close,
    confirm,
    handleOverlayClick,
    handleKeydown,
  }
}
