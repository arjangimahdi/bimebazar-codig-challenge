<template>
  <input
    v-model="model"
    type="text"
    inputmode="numeric"
    v-bind="$attrs"
    autocomplete="off"
    @input="onInput"
    @keydown="onKeydown"
    class="placeholder:tracking-wider tracking-widest placeholder:text-sm placeholder:text-center text-xl font-bold text-center outline-none px-2 py-1"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'UMaskInput' })
import { useMaskInput } from './useMaskInput'

const model = defineModel({ type: String, required: true, default: '' })

const { onInput, onKeydown } = useMaskInput(model)
</script>
