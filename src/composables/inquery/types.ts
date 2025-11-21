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

export interface InqueryPlateInterface {
  prefix: string
  suffix: string
  word: string
  code: string
}

export interface InqueryPlateQuery {
  plate: string
}

export interface InqueryTransformed {
  plate: InqueryPlateInterface
  brand: string
  model: string
  modelYear: string
  ownerFullName: string
  ownerNationalId: string
  annualInsurancePrice: number
  annualInsurancePriceFormatted: string
}
