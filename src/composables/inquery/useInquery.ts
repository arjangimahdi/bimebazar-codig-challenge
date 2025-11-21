import { ref } from 'vue'
import { fetchInqueryByPlate } from './inquery.service'
import { transformInqueryResponse } from './inquery.transform'
import type { ApiResponse } from '@/types'
import { useNotify } from '../useNotify'

export default function useInquery() {
  const isLoading = ref(false)
  const { notify } = useNotify()
  const getVehicleInfoByPlate = async (plate: string) => {
    isLoading.value = true
    try {
      const { data } = await fetchInqueryByPlate(plate)
      return transformInqueryResponse(data)
    } catch (err: unknown) {
      const error = (err as Error).message ?? 'خطایی رخ داده است'
      notify({
        title: 'خطا',
        message: error,
        type: 'error',
        timeout: 4000,
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    getVehicleInfoByPlate,
  }
}
