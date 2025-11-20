interface PlateValue {
  code: string
  prefix: string
  suffix: string
  word: PlateWord
}

interface PlateWord {
  id: number
  label: string
  value: string
}

export type { PlateValue, PlateWord }
