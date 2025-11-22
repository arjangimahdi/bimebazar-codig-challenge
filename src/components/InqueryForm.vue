<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex flex-row-reverse bg-white border-2 border-black rounded-md">
      <div class="flag-vector-container bg-contain bg-center bg-no-repeat" />
      <div class="flex flex-row-reverse items-stretch">
        <UMaskInput
          dir="ltr"
          v-model="platePrefix"
          maxlength="2"
          placeholder="&#8212;&#8212;"
          class="w-18"
        />
        <select v-model="plateWordId" class="px-2 text-xl font-bold">
          <option v-for="word in plateWords" :key="word.id" :value="word.id">
            {{ word.label }}
          </option>
        </select>
        <UMaskInput
          dir="ltr"
          v-model="plateSuffix"
          maxlength="3"
          placeholder="&#8212;&#8212;&#8212;"
          class="w-24"
        />
      </div>
      <div class="flex flex-col text-center justify-around border-e-2 border-black">
        <span class="text-xs font-bold pt-2"> ایران </span>
        <UMaskInput
          dir="ltr"
          v-model="plateCode"
          maxlength="2"
          class="w-14"
          placeholder="&#8212;&#8212;"
        />
      </div>
    </div>
    <UButton block size="lg" :loading="props.isLoading" @click="handleSubmit">
      {{ props.isLoading ? 'در حال ارسال...' : 'تایید و ادامه' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { UButton, UMaskInput } from '@/components/ui'
import { useNotify } from '@/composables/useNotify'
import { validatePlate } from '@/validation/plate'
import plateWords from '@/constants/plate-words.const'

interface Emits {
  (e: 'submit', plate: string): void
}

interface Props {
  isLoading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { notify } = useNotify()

const plateCode = ref('')
const platePrefix = ref('')
const plateSuffix = ref('')
const plateWordId = ref<number>(1)

const plateWordItem = computed(() => plateWords.find((word) => word.id === plateWordId.value))

const plateValues = computed(
  () => `${platePrefix.value}${plateWordItem.value?.value}${plateSuffix.value}-${plateCode.value}`,
)

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
