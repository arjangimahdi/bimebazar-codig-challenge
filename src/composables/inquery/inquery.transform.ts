import type { InqueryResponseDto, InqueryTransformed } from './inquery.types'
import { formatPersianYearMonth, parsePlateParts, formatCurrency } from '@/utils/format'
import { calculateInsurancePrice } from '@/composables/useCalculateInsuranceAmount'

export function transformInqueryResponse(dto: InqueryResponseDto): InqueryTransformed {
  const plate = parsePlateParts(dto.plate)
  const manufacture = formatPersianYearMonth(dto.make_date)
  const annualInsurancePrice = calculateInsurancePrice(dto.make_date)
  return {
    plate: {
      prefix: plate.prefix,
      suffix: plate.suffix,
      word: plate.word,
      code: plate.code,
    },
    brand: dto.brand,
    model: dto.model,
    modelYear: manufacture,
    ownerFullName: dto.owner?.name_full || '',
    ownerNationalId: dto.owner?.national_id || '',
    annualInsurancePrice: formatCurrency(annualInsurancePrice),
  }
}
