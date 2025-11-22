import { defineStore } from 'pinia'
import type { NotificationItem } from '@/types'

let counter = 0

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    items: [] as NotificationItem[],
  }),
  actions: {
    notify(payload: Omit<NotificationItem, 'id'>): number {
      const id = ++counter
      this.items.push({ id, ...payload })
      return id
    },
    remove(id: number) {
      this.items = this.items.filter((n) => n.id !== id)
    },
    clear() {
      this.items = []
    },
  },
})
