export function calculateAnnualInsurancePrice(
  makeDate: string | Date,
  basePrice = 1_000_000,
  annualRate = 0.12,
): number {
  const manufacture = new Date(makeDate)
  if (Number.isNaN(manufacture.getTime())) return basePrice

  const now = new Date()
  let age = now.getFullYear() - manufacture.getFullYear()
  const monthDiff = now.getMonth() - manufacture.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < manufacture.getDate())) {
    age--
  }
  if (age < 0) age = 0

  const rawPrice = Math.round(basePrice * Math.pow(1 + annualRate, age))
  const normalizedPrice = Math.floor(rawPrice / 1000) * 1000
  return normalizedPrice
}
