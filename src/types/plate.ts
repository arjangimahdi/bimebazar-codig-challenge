export interface PlateValue {
  code: string
  prefix: string
  suffix: string
  word: PlateWord
}

export interface PlateWord {
  id: number
  label: string
  value: string
}
