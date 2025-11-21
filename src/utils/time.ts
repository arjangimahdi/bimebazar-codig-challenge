import { toPersianDigits } from '@/utils/format'

export function timeAgo(input: number | Date, now: Date = new Date()): string {
  const ts = typeof input === 'number' ? new Date(input) : input
  const diffMs = now.getTime() - ts.getTime()
  if (diffMs <= 0) return 'لحظاتی پیش'

  const sec = Math.floor(diffMs / 1000)
  if (sec < 60) return `${toPersianDigits(String(sec))} ثانیه پیش`

  const min = Math.floor(sec / 60)
  if (min < 60) return `${toPersianDigits(String(min))} دقیقه پیش`

  const hr = Math.floor(min / 60)
  if (hr < 24) return `${toPersianDigits(String(hr))} ساعت پیش`

  const day = Math.floor(hr / 24)
  return `${toPersianDigits(String(day))} روز پیش`
}
