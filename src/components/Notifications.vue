<template>
  <div>
    <Notification
      v-for="n in items"
      :key="n.id"
      :title="n.title"
      :message="n.message"
      :type="n.type"
      :timeout="n.timeout ?? 3000"
      :show="true"
      @close="remove(n.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Notification from '@/components/Notification.vue'
import { useNotificationsStore } from '@/stores/notifications'

const store = useNotificationsStore()
const { items } = storeToRefs(store)
const remove = (id: number) => store.remove(id)
</script>
