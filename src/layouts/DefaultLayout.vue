<template>
  <main class="max-w-xl md:w-full mx-auto h-screen">
    <RouterView />
    <Notifications />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notifications from '@/components/Notifications.vue'
</script>
