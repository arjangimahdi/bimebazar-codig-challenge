export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type ButtonColor = 'info' | 'error' | 'green' | 'gray'

export interface ButtonProps {
  size?: ButtonSize
  variant?: ButtonVariant
  color?: ButtonColor
  block?: boolean
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}
