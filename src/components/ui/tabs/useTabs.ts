import { computed } from 'vue'
import type { TabsProps } from './tabs.types'

export function useTabs(_props: Readonly<TabsProps>) {
  const baseClass =
    'flex items-center justify-center px-4 py-4 transition-colors text-sm font-medium gap-x-2'

  const getLinkClass = (isActive: boolean) =>
    [baseClass, isActive ? 'bg-blue-200 text-blue-700 border-blue-200' : 'bg-gray-200'].join(' ')

  return {
    getLinkClass,
  }
}
