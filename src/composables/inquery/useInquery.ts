import { ref } from 'vue'
import { fetchInqueryByPlate } from './inquery.service'
import { transformInqueryResponse } from './inquery.transform'
import { useNotify } from '../useNotify'
import type { InqueryTransformed } from '.'
import { insert } from '@/providers/indexedDb'
import { timeAgo } from '@/utils/time'

export const useInquery = () => {
  const isLoading = ref(false)
  const { notify } = useNotify()

  const getVehicleInfoByPlate = async (plate: string) => {
    isLoading.value = true
    try {
      const { data } = await fetchInqueryByPlate(plate)
      const transformed = transformInqueryResponse(data)

      await saveInquery({ ...transformed, plateEn: plate })

      return transformed
    } catch (err: unknown) {
      const error = (err as Error).message ?? 'خطایی رخ داده است'
      notify({
        title: 'خطا',
        message: error,
        type: 'error',
        timeout: 7000,
      })
    } finally {
      isLoading.value = false
    }
  }

  const saveInquery = async (inquery: InqueryTransformed & { plateEn: string }) => {
    try {
      const payload = {
        ...inquery,
        plate: JSON.stringify(inquery.plate),
        createdAt: timeAgo(Date.now()),
      }
      await insert(payload)
    } catch (err: unknown) {
      const error = (err as Error).message ?? 'ارتباط به دیتابیس برقرار نشد.'

      notify({
        title: 'خطا',
        message: error,
        type: 'error',
        timeout: 7000,
      })
    }
  }

  return {
    isLoading,
    getVehicleInfoByPlate,
  }
}
