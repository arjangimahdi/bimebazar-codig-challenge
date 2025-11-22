import { computed } from 'vue'
import type { ButtonProps } from './button.types'
import { buttonTv } from './button.theme'

export function useButton(props: ButtonProps = {}) {
  const classes = computed(() =>
    buttonTv({
      size: props.size,
      variant: props.variant,
      color: props.color,
      loading: props.loading,
      block: props.block,
    }),
  )

  const spinnerClass = computed(
    () =>
      'inline-block size-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin',
  )

  return {
    classes,
    spinnerClass,
  }
}
