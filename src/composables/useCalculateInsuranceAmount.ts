import { calculateAnnualInsurancePrice } from '@/utils/pricing'

export function calculateInsurancePrice(
  makeDate: string | Date,
  basePrice = 1_000_000,
  annualRate = 0.12,
): number {
  return calculateAnnualInsurancePrice(makeDate, basePrice, annualRate)
}

export const useCalculateInsuranceAmount = () => {
  return {
    calculateInsurancePrice,
  }
}
