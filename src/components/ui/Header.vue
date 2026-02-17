<script setup lang="ts">
// import { useRouter } from 'vue-router'
import Button from 'primevue/button'
// import VideoCallIcon from './icons/VideoCallIcon.vue'
// import { useNewsStore } from '../stores/newsStore'

// const newsStore = useNewsStore()
// const router = useRouter()

const emit = defineEmits([ 'toggle-sidebar' ])

// const openActionModal = async (): Promise<void> => {
//   if (router.currentRoute.value.path !== '/main') {
//     await router.push('/main')
//     newsStore.setModalOpen(true)
//   } else {
//     newsStore.setModalOpen(true)
//   }
// }

</script>

<template>
  <header class="header">
    <Button
      icon="pi pi-bars"
      variant="text"
      rounded
      size="large"
      aria-label="Sidebar button"
      @click="emit('toggle-sidebar')"
    />
    <h1 class="header-title">
      AI Agents
    </h1>
    <div class="header-actions">
      <!-- <Button
        variant="text"
        raised
        @click="openActionModal"
      >
        <VideoCallIcon :iconSize="22" />
        <span>Добавить событие</span>
      </Button> -->
    </div>
  </header>
</template>

<style scoped lang="scss">

  .header {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.6);
    margin: 0 auto;
    background: white;
    padding: 8px $spacer-2;
    z-index: 99;

    .p-button-text {
      color: $primary-color;
    }

    &-title {
      margin-left: calc($spacer-2);
      font-family: -apple-system,BlinkMacSystemFont,Roboto,Segoe UI,Helvetica,Arial,sans-serif;
      color: $primary-color;
      font-size: 22px;
      line-height: 22px;
      letter-spacing: .05em;
      font-weight: 700;
    }

    &-actions {
      margin-left: auto;

      .p-button {
        border: none;
        border-radius: 12px;
        color: white;
        padding: $spacer 10px;
        font-size: 14px;
        text-transform: uppercase;
        font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
        background: $primary-color;
      }

      // Пробиваем scoped-стили внутрь PrimeVue Button
      :deep(.p-button .p-button-label) {
        font-weight: 300 !important;
      }
    }

    &-actions:hover {
      .p-button {
        border: none;
        color: white;
        background: $primary-color;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
      }
    }
  }

@media screen and (min-width: 480px) {
  .header {
    &__title {
      font-size: 24px;
      line-height: 24px;
    }
  }
}

@media screen and (min-width: 768px) {
  .header {

    &-title {
      font-size: 30px;
      line-height: 30px;
    }
  }
}

// @media screen and (min-width: 1200px) {
//   .header {
//     &-title {
//       font-size: 36px;
//       line-height: 40px;
//     }
//   }
// }

@media screen and (min-width: 1500px) {
  .header {
    padding-bottom: $spacer-2;
    &-title {
      font-size: 36px;
      line-height: 40px;
    }
  }
}
</style>



<!-- <template>
  <header class="header" role="banner">
    <div class="header-container">
      <button
        class="menu-btn"
        aria-label="Toggle sidebar"
        :aria-expanded="sidebarOpen"
        aria-controls="sidebar"
        @click="handleMenuClick"
      >
        <svg
          class="menu-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div class="header-title">
        <h1>AI Agents</h1>
      </div>

      <div class="header-actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

const sidebarOpen = computed(() => Boolean(uiStore.sidebarOpen))

const handleMenuClick = () => {
  uiStore.toggleSidebar()
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.menu-btn:hover {
  background-color: #f3f4f6;
}

.menu-btn:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.header-title {
  flex: 1;
}

.header-title h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .header-container {
    padding: 0.75rem;
  }

  .header-title h1 {
    font-size: 1.25rem;
  }
}
</style> -->
