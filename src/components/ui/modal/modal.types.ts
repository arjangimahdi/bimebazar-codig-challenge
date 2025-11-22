export interface ModalProps {
  modelValue: boolean
  padded?: boolean
  title?: string
  hideCloseButton?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  lockScroll?: boolean
  maxWidth?: string
}

export interface ModalEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}
