<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[classes, $attrs.class]"
    v-bind="{ ...$attrs, class: undefined }"
  >
    <span v-if="loading" class="me-2 inline-flex items-center">
      <span :class="spinnerClass" />
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'UButton' })
import { toRefs } from 'vue'
import type { ButtonProps } from './button.types'
import { useButton } from './useButton'

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'solid',
  color: 'info',
  block: false,
  disabled: false,
  loading: false,
  type: 'button',
})

const { size, variant, color, loading, block } = toRefs(props)
const { classes, spinnerClass } = useButton({
  size: size.value,
  variant: variant.value,
  color: color.value,
  loading: loading.value,
  block: block.value,
})

const { disabled, type } = toRefs(props)
</script>
