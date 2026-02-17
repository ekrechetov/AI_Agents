import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const sidebarOpen = ref<boolean>(false)

  function toggleSidebar(): void {
    sidebarOpen.value = !sidebarOpen.value
  }

  function openSidebar(): void {
    sidebarOpen.value = true
  }

  function closeSidebar(): void {
    sidebarOpen.value = false
  }

  return {
    sidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
})
