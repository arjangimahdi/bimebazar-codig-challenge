import { ref } from 'vue'
import type { BottomSheetProps, BottomSheetEmits } from './bottom-sheet.types'

export function useBottomSheet(
  _props: Readonly<Required<BottomSheetProps>>,
  emit: BottomSheetEmits,
) {
  const startY = ref(0)
  const translateY = ref(0)
  const dragging = ref(false)
  const threshold = 100

  const close = () => {
    emit('update:modelValue', false)
    emit('close')
  }

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

  return {
    startY,
    translateY,
    dragging,
    threshold,
    close,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
