<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/ui/Header.vue'
import Sidebar from '@/components/features/Sidebar.vue'
import { useConversationStore } from '@/stores/conversationStore'
import { useClickOutside } from '@/composables/useClickOutside'
import Tabbar from '@/components/ui/Tabbar.vue'

const conversationStore = useConversationStore()

const sidebarRef = ref<HTMLElement | null>(null)

// Close by clicking outside the Sidebar or by pressing Escape
const { skipNextClick } = useClickOutside(sidebarRef, () => {
  if (conversationStore.isExpanded) conversationStore.setExpanded(false)
})

// Button click Sidebar handler from Header
const handleToggleSidebar = () => {
  skipNextClick() // предотвращаем "самозакрытие"
  conversationStore.setExpanded(!conversationStore.isExpanded)
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
    margin-top: 56px;//todo: var(--sidebar-width) when it will be implemented
    margin-left: 70px;//todo: var(--sidebar-width) when it will be implemented
    height: calc(100vh - 56px);
    
    display: flex;
    flex-direction: column;
    padding: 0 4px;
    background: rgb(247, 245, 245);
    overflow: hidden;

    .page-content {
      flex: 1;
      display: flex;
      justify-content: center;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 1px -1px, rgba(0, 0, 0, 0.14) 0px 100px 1px 0px, rgba(0, 0, 0, 0.12) 0px 10px 3px 0px;
      overflow-y: auto;
    }
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
