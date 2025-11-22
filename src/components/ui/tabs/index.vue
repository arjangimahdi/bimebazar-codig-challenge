<template>
  <nav class="w-full">
    <ul class="flex flex-row items-stretch">
      <li v-for="tab in items" :key="tab.id" class="flex-1">
        <RouterLink :to="{ name: tab.route }" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            :aria-current="isActive ? 'page' : undefined"
            :class="getLinkClass(isActive)"
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
defineOptions({ name: 'UTabs' })
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import type { TabsProps } from './tabs.types'
import { useTabs } from './useTabs'

const props = defineProps<TabsProps>()
const { getLinkClass } = useTabs(props)
</script>
