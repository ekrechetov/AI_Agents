<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import 'primeicons/primeicons.css'
import { useSidebarStore } from '@/stores/sidebarStore'
import { useTabbarStore } from '@/stores/tabbarStore'

const sidebarStore = useSidebarStore()
const tabbarStore = useTabbarStore()
const router = useRouter()

const isExpanded = computed(() => sidebarStore.isExpanded)

const addTab = (itemLabel: string): void => {
  if (!tabbarStore.tabs.some(item => item.label === itemLabel)) {
    tabbarStore.addTab(itemLabel)
  }
  router.push(`/${itemLabel.toLowerCase()}`)
}
</script>

<template>
  <div :class="['sidebar', {'sidebar-expanded': isExpanded }]">
    <div :class="['sidebar-item', { 'sidebar-item-expanded': !isExpanded }]" @click="addTab('AI-chat')">
      <span class="pi pi-microchip-ai" :style="{fontSize: '1.3rem', color: 'white'}"></span>
      <span :class="['sidebar-item-label', { 'expanded': isExpanded }]">ИИ-чат</span>
    </div>
    <div :class="['sidebar-item', { 'sidebar-item-expanded': !isExpanded }]" @click="addTab('AI-pdf')">
      <span class="pi pi-file-pdf" :style="{fontSize: '1.3rem', color: 'white'}"></span>
      <span :class="['sidebar-item-label', { 'expanded': isExpanded }]">ИИ-pdf</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
	display: flex;
	flex-direction: column;
	padding: $spacer-2;

  height: 100%;
  background: rgb(100, 69, 205);
  width: 70px;
  margin-top: 56px;
  overflow-y: auto;
  transition: width 0.2s ease-in-out;
  position: absolute;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 2;

	&-item {
		display: flex;
		align-items: center;
		padding: $spacer;
		cursor: pointer;

		&-label {
			color: white;
			font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
			font-size: 14px;
			font-weight: 500;
			text-wrap: nowrap;
			opacity: 0;
			display: inline-block;
			transition: opacity 0.4s ease;
			margin-left: $spacer-2;
			pointer-events: none; /* чтобы не мешал кликам, когда скрыт */
		}

		&-label.expanded {
			opacity: 1;
			pointer-events: auto;
		}
	}

	&-item-expanded {
		border-radius: 50%;
	}

	&-item:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
}

.sidebar.sidebar-expanded {
  width: 200px;
}
</style>




<!-- <template>
  <div
    v-if="sidebarOpen"
    class="sidebar-overlay"
    @click="handleOverlayClick"
    aria-hidden="true"
  />

  <aside
    id="sidebar"
    ref="sidebarRef"
    class="sidebar"
    :class="{ 'sidebar-open': sidebarOpen }"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="sidebar-content">
      <nav class="sidebar-nav">
        <h2 class="sidebar-title">Agents</h2>
        
        <button
          v-for="agent in agents"
          :key="agent.id"
          class="agent-item"
          :aria-current="currentConversationId?.includes(agent.id) ? 'page' : undefined"
          @click="handleSelectAgent(agent)"
        >
          <span class="agent-avatar">{{ agent.avatar }}</span>
          <div class="agent-info">
            <div class="agent-name">{{ agent.name }}</div>
            <div class="agent-description">{{ agent.description }}</div>
          </div>
        </button>
      </nav>

      <div class="sidebar-divider" />

      <nav class="sidebar-nav">
        <h2 class="sidebar-title">Conversations</h2>
        
        <button
          v-for="conversation in conversations"
          :key="conversation.id"
          class="conversation-item"
          :class="{ 'conversation-active': conversation.id === currentConversationId }"
          :aria-current="conversation.id === currentConversationId ? 'page' : undefined"
          @click="selectConversation(conversation.id)"
        >
          <div class="conversation-title">{{ conversation.title }}</div>
          <button
            class="delete-btn"
            aria-label="Delete conversation"
            @click.stop="deleteConversation(conversation.id)"
          >
            ×
          </button>
        </button>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUIStore } from '@/stores/ui'
import { useChatStore } from '@/stores/chat'
import { useClickOutside } from '@/composables/useSidebar'
import type { Agent } from '@/types'

const uiStore = useUIStore()
const chatStore = useChatStore()

const sidebarRef = ref<HTMLElement | null>(null)

const sidebarOpen = computed(() => uiStore.sidebarOpen)
const agents = computed(() => chatStore.agents)
const conversations = computed(() => chatStore.conversations)
const currentConversationId = computed(() => chatStore.currentConversationId)

useClickOutside(sidebarRef, () => {
  if (uiStore.sidebarOpen) {
    uiStore.closeSidebar()
  }
})

const handleOverlayClick = () => {
  uiStore.closeSidebar()
}

const handleSelectAgent = (agent: Agent) => {
  chatStore.createConversation(agent.id, agent.name)
  uiStore.closeSidebar()
}

const selectConversation = (conversationId: string) => {
  chatStore.selectConversation(conversationId)
}

const deleteConversation = (conversationId: string) => {
  chatStore.deleteConversation(conversationId)
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.sidebar {
  position: fixed;
  left: 0;
  top: 3.5rem;
  height: calc(100vh - 3.5rem);
  width: 280px;
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
  z-index: 40;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-content {
  padding: 1rem 0;
}

.sidebar-nav {
  padding: 0 1rem 1rem 1rem;
}

.sidebar-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  padding: 0 0.5rem;
}

.agent-item,
.conversation-item {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.agent-item:hover {
  background-color: #eff6ff;
}

.agent-item:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 0;
}

.agent-avatar {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.agent-info {
  flex: 1;
  min-width: 0;
}

.agent-name {
  font-weight: 500;
  color: #1f2937;
}

.agent-description {
  font-size: 0.75rem;
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-item {
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
}

.conversation-active {
  background-color: #dbeafe;
  color: #1e40af;
}

.conversation-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #9ca3af;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background-color: #fee2e2;
  color: #ef4444;
}

.sidebar-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 1rem 0;
}

@media (min-width: 1024px) {
  .sidebar {
    position: relative;
    top: 0;
    height: auto;
    transform: none;
    border-right: 1px solid #e5e7eb;
  }

  .sidebar-overlay {
    display: none;
  }
}

@media (max-width: 640px) {
  .sidebar {
    width: 100%;
    top: 0;
    height: 100vh;
  }
}
</style> -->
