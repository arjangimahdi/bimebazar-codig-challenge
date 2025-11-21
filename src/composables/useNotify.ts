import { storeToRefs } from 'pinia'
import {
  useNotificationsStore,
  type NotificationItem,
  type NotificationType,
} from '@/stores/notifications'

export type NotifyParams = {
  title?: string
  message: string
  type?: NotificationType
  timeout?: number
}

export function useNotify() {
  const store = useNotificationsStore()
  const { items } = storeToRefs(store)
  const notify = (params: NotifyParams) =>
    store.notify({
      title: params.title,
      message: params.message,
      type: params.type ?? 'info',
      timeout: params.timeout ?? 3000,
    })
  const remove = (id: number) => store.remove(id)
  const clear = () => store.clear()
  return { items, notify, remove, clear }
}
