<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex flex-row-reverse bg-white border-2 border-black rounded-md">
      <div class="flag-vector-container bg-contain bg-center bg-no-repeat" />
      <div class="flex flex-row-reverse items-stretch">
        <MaskInput
          dir="ltr"
          v-model="platePrefix"
          maxlength="2"
          placeholder="&#8212;&#8212;"
          class="w-18"
        />
        <select v-model="plateWordId" class="px-2 text-xl font-bold outline-none">
          <option v-for="word in plateWords" :key="word.id" :value="word.id">
            {{ word.label }}
          </option>
        </select>
        <MaskInput
          dir="ltr"
          v-model="plateSuffix"
          maxlength="3"
          placeholder="&#8212;&#8212;&#8212;"
          class="w-24"
        />
      </div>
      <div class="flex flex-col text-center justify-around border-e-2 border-black">
        <span class="text-xs font-bold pt-2"> ایران </span>
        <MaskInput
          dir="ltr"
          v-model="plateCode"
          maxlength="2"
          class="w-14"
          placeholder="&#8212;&#8212;"
        />
      </div>
    </div>
    <button
      @click="handleSubmit"
      :disabled="props.isLoading"
      class="w-full h-12 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ props.isLoading ? 'در حال ارسال...' : 'تایید و ادامه' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MaskInput from '@/components/MaskInput.vue'
import plateWords from '@/constants/plate-words.const'
import { validatePlate } from '@/validation/plate'
import { useNotify } from '@/composables/useNotify'

interface Emits {
  (e: 'submit', plate: string): void
}

interface Props {
  isLoading?: boolean
}

const props = defineProps<Props>()

const plateCode = ref('')
const platePrefix = ref('')
const plateSuffix = ref('')
const plateWordId = ref<number>(1)

const plateWordItem = computed(() => plateWords.find((word) => word.id === plateWordId.value))

const plateValues = computed(
  () => `${platePrefix.value}${plateWordItem.value?.value}${plateSuffix.value}-${plateCode.value}`,
)
const emit = defineEmits<Emits>()
const { notify } = useNotify()

function handleSubmit() {
  const parsed = validatePlate({
    prefix: platePrefix.value,
    suffix: plateSuffix.value,
    code: plateCode.value,
  })
  if (!parsed.success) {
    const { _errors } = parsed.error.format()
    Object.values(_errors).forEach((error) => {
      notify({
        title: 'خطا',
        message: error,
        type: 'error',
        timeout: 7000,
      })
    })
    return
  }
  emit('submit', plateValues.value)
}
</script>

<style scoped>
.flag-vector-container {
  width: 35px;
  height: 60px;
  background-image: url('/plate-flag-vector.svg');
}
</style>
