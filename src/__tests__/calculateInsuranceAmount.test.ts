import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { calculateInsurancePrice } from '@/composables/useCalculateInsuranceAmount'

describe('calculateInsurancePrice', () => {
  const fixedNow = new Date('2025-01-01T00:00:00Z')

  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('returns base price for same-day manufacture date (age 0)', () => {
    const price = calculateInsurancePrice('2025-01-01T00:00:00Z')
    expect(price).toBe(1_000_000)
  })

  it('returns base price for very recent previous date (still age 0)', () => {
    const price = calculateInsurancePrice('2024-12-31T00:00:00Z')
    expect(price).toBe(1_000_000)
  })

  it('applies one year growth correctly (age 1)', () => {
    const price = calculateInsurancePrice('2024-01-01T00:00:00Z')
    expect(price).toBe(1_120_000) // 1_000_000 * 1.12
  })

  it('returns base price for invalid date', () => {
    const price = calculateInsurancePrice('invalid-date')
    expect(price).toBe(1_000_000)
  })

  it('normalizes to the nearest lower thousand', () => {
    const customBase = 1_234_567
    const price = calculateInsurancePrice('2025-01-01T00:00:00Z', customBase, 0)
    expect(price).toBe(1_234_000)
  })
})
