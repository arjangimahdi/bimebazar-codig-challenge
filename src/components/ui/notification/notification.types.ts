export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'neutral'

export interface NotificationProps {
  title?: string
  message: string
  type?: NotificationType
  timeout?: number
  show?: boolean
}
