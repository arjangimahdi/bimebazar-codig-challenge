import type { PlateValue } from '@/types'

export interface InqueryOwnerDto {
  name_full: string
  national_id: string
}

export interface InqueryResponseDto {
  plate: string
  brand: string
  model: string
  make_date: string
  owner: InqueryOwnerDto
}

export interface InqueryPlateQuery {
  plate: string
}

export interface InqueryTransformed {
  plate: PlateValue
  brand: string
  model: string
  modelYear: string
  ownerFullName: string
  ownerNationalId: string
  annualInsurancePrice: string
}
