<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useConversationStore } from '@/stores/conversationStore'
import type { Conversation } from '@/types'

const conversationStore = useConversationStore()

interface Props {
  conversation: Conversation;
}

const { conversation } = defineProps<Props>()

const currentConversationId = computed(() => conversationStore.currentConversationId)
const selectConversation = computed(() => conversationStore.selectConversation)
const isActive = computed(() => currentConversationId.value === conversation.id)

const closeTab = (event: MouseEvent): void => {
  event.preventDefault()
  event.stopPropagation()
  conversationStore.deleteConversation(conversation.id)
}
</script>

<template>
  <RouterLink
    :to="conversation.agentPath"  
    :title="conversation.agentName"
    @click="selectConversation(conversation.id)"
  >
    <div :class="['tab', isActive && 'tab-active']">
      <span class="tab-label">{{ conversation.agentName }}</span>
      <span v-if="isActive" class="pi pi-times tab-close-icon" @click="closeTab"></span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.tab {
  display: flex;
  align-items: center;
  background: rgb(217, 215, 215);
  transition: 0.3s;
  margin-right: calc($spacer / 2);
  padding: calc($spacer / 2) $spacer;
  border-radius: 5px 12px 0 0;
  border: 1px solid $secondary-color-light;
  border-bottom: none;
  color: $secondary-text-color;
  white-space: nowrap;

  &-label {
    font-size: 16px;
    color: inherit;
  }

  &-close-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.5);
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }

  &-close-icon:hover {
    color: rgba(0, 0, 0, 1);
    background: $secondary-color-light;
  }
}

.tab:not(.tab-active):hover {
  background: $secondary-color-light;
}

.tab-active  {
  background: #fff;
  color: black;
  font-weight: 500;
  cursor: default;
}
</style>
