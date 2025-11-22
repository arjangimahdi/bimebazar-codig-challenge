import { tv, type VariantProps } from 'tailwind-variants'
import type { ButtonProps } from './button.types'

export const buttonTv = tv({
  base:
    'inline-flex items-center justify-center rounded-md font-medium ' +
    'transition-all duration-300 cursor-pointer ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
    variant: {
      solid: '',
      outline: 'border',
      ghost: '',
    },
    color: {
      info: '',
      error: '',
      green: '',
      gray: '',
    },
    loading: {
      true: 'relative',
    },
    block: {
      true: 'w-full',
    },
  },
  compoundVariants: [
    // solid
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
    },
    {
      variant: 'solid',
      color: 'error',
      class: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    },
    {
      variant: 'solid',
      color: 'green',
      class: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600',
    },
    {
      variant: 'solid',
      color: 'gray',
      class: 'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-600',
    },

    // outline
    {
      variant: 'outline',
      color: 'info',
      class:
        'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600',
    },
    {
      variant: 'outline',
      color: 'error',
      class:
        'bg-transparent text-red-600 border-red-600 hover:bg-red-50 focus-visible:ring-red-600',
    },
    {
      variant: 'outline',
      color: 'green',
      class:
        'bg-transparent text-green-600 border-green-600 hover:bg-green-50 focus-visible:ring-green-600',
    },
    {
      variant: 'outline',
      color: 'gray',
      class:
        'bg-transparent text-gray-800 border-gray-400 hover:bg-gray-50 focus-visible:ring-gray-400',
    },

    // ghost
    {
      variant: 'ghost',
      color: 'info',
      class: 'bg-transparent text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600',
    },
    {
      variant: 'ghost',
      color: 'error',
      class: 'bg-transparent text-red-600 hover:bg-red-50 focus-visible:ring-red-600',
    },
    {
      variant: 'ghost',
      color: 'green',
      class: 'bg-transparent text-green-600 hover:bg-green-50 focus-visible:ring-green-600',
    },
    {
      variant: 'ghost',
      color: 'gray',
      class: 'bg-transparent text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-400',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'info',
  },
})

export type ButtonTvProps = VariantProps<typeof buttonTv>

export function buttonClasses({
  size = 'md',
  variant = 'solid',
  color = 'info',
  loading = false,
  block = false,
}: ButtonProps = {}) {
  return buttonTv({ size, variant, color, loading, block })
}
