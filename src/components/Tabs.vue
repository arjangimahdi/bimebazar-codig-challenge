<template>
  <nav class="w-full">
    <ul class="flex flex-row items-stretch">
      <li v-for="tab in items" :key="tab.id" class="flex-1">
        <RouterLink :to="{ name: tab.route }" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            :aria-current="isActive ? 'page' : undefined"
            :class="[
              'flex items-center justify-center px-4 py-4 transition-colors text-sm font-medium gap-x-2',
              isActive ? 'bg-blue-200 text-blue-700 border-blue-200' : 'bg-gray-200',
            ]"
          >
            <Icon v-if="tab.icon" :icon="tab.icon" class="w-5 h-5" aria-hidden="true" />
            <span>{{ tab.title }}</span>
          </a>
        </RouterLink>
      </li>
    </ul>
  </nav>
  <slot />
</template>

<script setup lang="ts">
defineOptions({ name: 'AppTabs' })
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

interface TabItem {
  id: number
  title: string
  icon: string
  route: string
}

defineProps<{
  items: TabItem[]
}>()
</script>
