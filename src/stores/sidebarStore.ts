import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebarStore', () => {

  const isExpanded = ref<boolean>(false)

  const setExpanded = (sidebarState: boolean): void => {
    isExpanded.value = sidebarState
  }

  return { isExpanded, setExpanded }
})
