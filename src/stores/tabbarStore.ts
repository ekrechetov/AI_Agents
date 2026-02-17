import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TabbarItemType } from '@/types'

export const useTabbarStore = defineStore('tabbarStore', () => {

  const tabs = ref<TabbarItemType[]>([
    // {
    //   path: '/main',
    //   label: 'Main'
    // },
    // {
    //   path: '/chats',
    //   label: 'ChatRoom'
    // },
    // {
    //   path: '/profile',
    //   label: 'Profile'
    // }
  ])

  const addTab = (label: string): void => {
    tabs.value.push({ path: `/${label.toLowerCase()}`, label })
  }

  const removeTab = (tab: TabbarItemType): void => {
    tabs.value = tabs.value.filter(item => item.path !== tab.path)
  }

  return { tabs, addTab, removeTab }
})
