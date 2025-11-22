<template>
  <main class="max-w-xl md:w-full mx-auto h-screen min-h-fit flex flex-col">
    <UNotifications />
    <div class="flex-1 overflow-y-auto">
      <RouterView />
    </div>
    <div class="max-w-xl md:w-full bottom-0 z-10">
      <UTabs :items="tabs" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { UNotifications, UTabs } from '@/components/ui'

import tabs from '@/constants/tabs'
</script>
