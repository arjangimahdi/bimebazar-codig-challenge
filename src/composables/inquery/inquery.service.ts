import type { ApiResponse } from '@/types'
import { useApi } from '../useApi'
import type { InqueryResponseDto } from './inquery.types'

export const fetchInqueryByPlate = async (
  plate: string,
): Promise<ApiResponse<InqueryResponseDto>> => {
  const api = useApi()
  return await api.get<InqueryResponseDto>(`inquiry/plate=${plate}`)
}
