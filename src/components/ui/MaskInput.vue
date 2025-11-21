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
const model = defineModel({ type: String, required: true, default: '' })

const CONTROL_KEYS = new Set([
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'Tab',
  'Enter',
])

function normalizeToAsciiDigits(input: string): string {
  return (input || '').replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (ch) => {
    const code = ch.charCodeAt(0)
    if (code >= 0x06f0 && code <= 0x06f9) {
      return String.fromCharCode(48 + (code - 0x06f0))
    }
    if (code >= 0x0660 && code <= 0x0669) {
      return String.fromCharCode(48 + (code - 0x0660))
    }
    return ch
  })
}

function sanitizeDigits(value: string, maxLen: number): string {
  const ascii = normalizeToAsciiDigits(value)
  let digits = ascii.replace(/[^0-9]/g, '')
  if (maxLen > -1) {
    digits = digits.slice(0, maxLen)
  }
  return digits
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const maxLen = target.maxLength ?? -1
  const next = sanitizeDigits(target.value, maxLen)
  if (next !== target.value) {
    target.value = next
  }
  model.value = next
}

function onKeydown(event: KeyboardEvent) {
  if (event.ctrlKey || event.metaKey || event.altKey) return
  if (CONTROL_KEYS.has(event.key)) return
  if (/^[0-9\u06F0-\u06F9\u0660-\u0669]$/.test(event.key)) return
  event.preventDefault()
}
</script>

<style scoped></style>
