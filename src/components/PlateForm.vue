<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex bg-white border-2 border-black rounded-md">
      <div class="flag-vector-container bg-contain bg-center bg-no-repeat" />
      <div class="flex items-stretch">
        <MaskInput
          v-model="platePrefix"
          maxlength="2"
          placeholder="&#8212;&#8212;"
          class="w-18"
          ref="prefixRef"
        />
        <select
          v-model="plateWordId"
          ref="selectRef"
          class="px-2 text-xl font-bold outline-none"
          @change="handleWordChange"
        >
          <option v-for="word in plateWords" :key="word.id" :value="word.id">
            {{ word.label }}
          </option>
        </select>
        <MaskInput
          v-model="plateSuffix"
          maxlength="3"
          placeholder="&#8212;&#8212;&#8212;"
          class="w-24"
          ref="suffixRef"
        />
      </div>
      <div class="flex flex-col text-center justify-around border-s-2 border-black">
        <span class="text-xs font-bold pt-2"> ایران </span>
        <MaskInput
          v-model="plateCode"
          maxlength="2"
          class="w-14"
          placeholder="&#8212;&#8212;"
          ref="codeRef"
        />
      </div>
    </div>
    <button
      @click="handleSubmit"
      class="w-full h-12 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300"
    >
      تایید و ادامه
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, type Ref } from 'vue'
import plateWords from '@/constants/plate-words.const'
import MaskInput from '@/components/MaskInput.vue'
import { openNativeSelect } from '@/utils/openNativeSelect'

type WithRootEl = { $el: HTMLElement }

const plateCode = ref('')
const platePrefix = ref('')
const plateSuffix = ref('')
const plateWordId = ref<number>(1)

const prefixRef: Ref<WithRootEl | null> = ref(null)
const suffixRef: Ref<WithRootEl | null> = ref(null)
const codeRef: Ref<WithRootEl | null> = ref(null)
const selectRef = ref<HTMLSelectElement | null>(null)

const plateWord = computed(() => plateWords.find((word) => word.id === plateWordId.value))

const plateValues = computed(() => {
  return {
    prefix: platePrefix.value,
    suffix: plateSuffix.value,
    code: plateCode.value,
    word: plateWord.value?.label,
  }
})

function focusInput(rootRef: Ref<WithRootEl | null>) {
  const el = rootRef.value?.$el as HTMLInputElement | undefined
  if (!el) return
  el.focus()
  try {
    const end = el.value?.length ?? 0
    el.setSelectionRange(end, end)
  } catch {}
}

function handleWordChange() {
  nextTick(() => focusInput(suffixRef))
}

watch(platePrefix, (val) => {
  if ((val?.length ?? 0) === 2) {
    nextTick(() => openNativeSelect(selectRef.value))
  }
})

watch(plateSuffix, (val) => {
  if ((val?.length ?? 0) === 3) {
    nextTick(() => focusInput(codeRef))
  }
})

watch(plateCode, (val) => {
  if ((val?.length ?? 0) === 2) {
    const el = codeRef.value?.$el as HTMLInputElement | undefined
    el?.blur()
  }
})

function handleSubmit() {
  console.log(plateValues.value)
}
</script>

<style scoped>
.flag-vector-container {
  width: 35px;
  height: 60px;
  background-image: url('/plate-flag-vector.svg');
}
</style>
