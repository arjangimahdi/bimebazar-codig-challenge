const PERSIAN_ZERO = 0x06f0
const ARABIC_ZERO = 0x0660
const ASCII_ZERO = 0x30

export function toLatinDigits(input: string): string {
  return (input || '').replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (ch) => {
    const code = ch.charCodeAt(0)
    if (code >= PERSIAN_ZERO && code <= PERSIAN_ZERO + 9) {
      return String.fromCharCode(ASCII_ZERO + (code - PERSIAN_ZERO))
    }
    if (code >= ARABIC_ZERO && code <= ARABIC_ZERO + 9) {
      return String.fromCharCode(ASCII_ZERO + (code - ARABIC_ZERO))
    }
    return ch
  })
}

export function toPersianDigits(input: string): string {
  return (input || '').replace(/[0-9\u0660-\u0669]/g, (ch) => {
    const code = ch.charCodeAt(0)
    if (code >= ASCII_ZERO && code <= ASCII_ZERO + 9) {
      return String.fromCharCode(PERSIAN_ZERO + (code - ASCII_ZERO))
    }
    if (code >= ARABIC_ZERO && code <= ARABIC_ZERO + 9) {
      return String.fromCharCode(PERSIAN_ZERO + (code - ARABIC_ZERO))
    }
    return ch
  })
}

export function formatPersianYearMonth(dateStr: string): string {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return ''
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: 'long',
    }).format(d)
  } catch {
    const monthNames = [
      'ژانویه',
      'فوریه',
      'مارس',
      'آوریل',
      'مه',
      'ژوئن',
      'ژوئیه',
      'اوت',
      'سپتامبر',
      'اکتبر',
      'نوامبر',
      'دسامبر',
    ]
    const year = d.getFullYear().toString()
    const month = monthNames[d.getMonth()] || ''
    return `${year} ${month}`
  }
}

export interface FormattedPlate {
  normalized: string
  formatted: string
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('fa-IR')
}

export interface PlateParts {
  prefix: string
  suffix: string
  word: string
  code: string
}

export function parsePlateParts(plateRaw: string): PlateParts {
  const raw = (plateRaw || '').replace(/\s+/g, '')
  const idx = raw.lastIndexOf('-')
  let left = raw
  let code = ''
  if (idx > -1) {
    left = raw.slice(0, idx)
    code = raw.slice(idx + 1)
  }
  const latinLeft = toLatinDigits(left)
  const word = latinLeft.replace(/\d/g, '')
  const digitsPart = latinLeft.replace(/[^\d]/g, '')
  const prefix = toPersianDigits(digitsPart.slice(0, 2))
  const suffix = toPersianDigits(digitsPart.slice(2))
  const codeFa = toPersianDigits(code)
  return { prefix, suffix, word, code: codeFa }
}
