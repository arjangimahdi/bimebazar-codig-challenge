<template>
  <main class="max-w-xl md:w-full mx-auto h-screen min-h-fit flex flex-col">
    <Notifications />
    <div class="flex-1 overflow-y-auto">
      <RouterView />
    </div>
    <div class="max-w-xl md:w-full bottom-0 z-10">
      <Tabs :items="tabs" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Tabs from '@/components/Tabs.vue'
import Notifications from '@/components/Notifications.vue'
import tabs from '@/constants/tabs'
</script>
