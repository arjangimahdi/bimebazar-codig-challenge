export interface PlateValue {
  code: string
  prefix: string
  suffix: string
  word: string | PlateWord
}

export interface PlateWord {
  id: number
  label: string
  value: string
}
