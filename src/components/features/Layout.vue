<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/ui/Header.vue'
import Sidebar from '@/components/features/Sidebar.vue'
import { useSidebarStore } from '@/stores/sidebarStore'
import { useClickOutside } from '@/composables/useClickOutside'
import Tabbar from '@/components/ui/Tabbar.vue'

const sidebarStore = useSidebarStore()

const sidebarRef = ref<HTMLElement | null>(null)

// Close by clicking outside the Sidebar or by pressing Escape
const { skipNextClick } = useClickOutside(sidebarRef, () => {
  if (sidebarStore.isExpanded) sidebarStore.setExpanded(false)
})

// Button click Sidebar handler from Header
const handleToggleSidebar = () => {
  skipNextClick() // предотвращаем "самозакрытие"
  sidebarStore.setExpanded(!sidebarStore.isExpanded)
}
</script>

<template>
  <div class="layout">
    <Header @toggle-sidebar="handleToggleSidebar"/>

    <aside ref="sidebarRef">
      <Sidebar />
    </aside>

    <main class="main">
      <Tabbar />
      <div class="page-content">
        <slot name="page"></slot>
      </div>
    </main>

  </div>
</template>

<style  scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;

  .main {
    margin-top: 56px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

/* @media (min-width: 1024px) {
  .layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-template-rows: 3.5rem 1fr;
  }

  :deep(header) {
    grid-column: 1 / -1;
  }

  .main-content {
    flex-direction: column;
  }
} */
</style>
