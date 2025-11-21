<template>
  <main class="max-w-xl md:w-full mx-auto h-screen">
    <RouterView />
    <Notifications />
    <div class="fixed max-w-xl md:w-full bottom-0 z-10">
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
