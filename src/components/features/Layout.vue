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
    <div class="layout-header">
      <Header @toggle-sidebar="handleToggleSidebar"/>
    </div>

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
  background-color: #f9fafb;
  height: 100dvh; // Dynamic height for mobile
  overflow: hidden;

  &-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    z-index: 200;
  }

  .main {
    margin-top: var(--header-height);
    height: calc(100dvh - var(--header-height));
    display: flex;
    flex-direction: column;
    padding: 0 4px;
    background: rgb(247, 245, 245);
    overflow: hidden;

    .page-content {
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 1px -1px, rgba(0, 0, 0, 0.14) 0px 100px 1px 0px, rgba(0, 0, 0, 0.12) 0px 10px 3px 0px;
      overflow-y: auto;
    }
  }
}

@media screen and (min-width: 480px) {
  .layout {
		main {
      margin-left: var(--sidebar-width);
    }
  }
}
</style>
