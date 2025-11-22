export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'gray'

export interface NotificationItem {
  id: number
  title?: string
  message: string
  type: NotificationType
  timeout?: number
}

export interface NotifyParams {
  title?: string
  message: string
  type?: NotificationType
  timeout?: number
}
