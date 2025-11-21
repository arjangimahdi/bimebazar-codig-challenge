import { ref } from 'vue'
import { fetchInqueryByPlate } from './inquery.service'
import { transformInqueryResponse } from './inquery.transform'
import type { ApiResponse } from '@/types'

export default function useInquery() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getVehicleInfoByPlate = async (plate: string) => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await fetchInqueryByPlate(plate)
      return transformInqueryResponse(data)
    } catch (err: unknown) {
      error.value = (err as Error).message ?? 'خطایی رخ داده است'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    getVehicleInfoByPlate,
  }
}
