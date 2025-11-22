export interface BottomSheetProps {
  modelValue?: boolean
  padded?: boolean
  lockScroll?: boolean
}

export interface BottomSheetEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}
