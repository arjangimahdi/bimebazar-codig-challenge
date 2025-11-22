import { tv, type VariantProps } from 'tailwind-variants'

export const notificationTv = tv({
  base: 'flex items-start gap-3 p-4 border rounded-lg shadow-md',
  variants: {
    color: {
      success: 'bg-green-50 text-green-800 border-green-200',
      error: 'bg-red-50 text-red-800 border-red-200',
      warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      info: 'bg-blue-50 text-blue-800 border-blue-200',
      neutral: 'bg-gray-50 text-gray-800 border-gray-200',
    },
  },
  defaultVariants: {
    color: 'info',
  },
})

export type NotificationTvProps = VariantProps<typeof notificationTv>
