<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import 'primeicons/primeicons.css'
import { useConversationStore } from '@/stores/conversationStore'
import type { Agent } from '@/types'

const conversationStore = useConversationStore()
const router = useRouter()

const isExpanded = computed(() => conversationStore.isExpanded)
const setExpanded = computed(() => conversationStore.setExpanded)
const selectConversation = computed(() => conversationStore.selectConversation)
const conversations = computed(() => conversationStore.conversations)
const createConversation = computed(() => conversationStore.createConversation)

const handleSelectAgent = (agent: Agent) => {
  setExpanded.value(false)
  if (!conversations.value.some(conv => conv.agentId === agent.id)) {
      createConversation.value(agent)
  } else {
    selectConversation.value(conversations.value.find(conv => conv.agentId === agent.id)!.id)
  }
  router.push(agent.path)
}
</script>

<template>
  <div :class="['sidebar', {'sidebar-expanded': isExpanded }]">
    <div
      v-for="agent in conversationStore.agents"
      :key="agent.id"
      :class="[
        'sidebar-item',
        { 'sidebar-item-expanded': !isExpanded },
        { 'sidebar-item-active': conversationStore.currentConversation?.agentName === agent.name }
      ]"
      @click="handleSelectAgent(agent)"
    >
      <span :class="['pi', agent.icon]" :style="{fontSize: '1.3rem', color: 'white'}"></span>
      <span :class="['sidebar-item-label', { 'expanded': isExpanded }]">{{ agent.name }}</span>
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

	&-item-active {
		background-color: rgba(255, 255, 255, 0.1);
	}

	&-item:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
}

.sidebar.sidebar-expanded {
  width: 200px;
}
</style>
