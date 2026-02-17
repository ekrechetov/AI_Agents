<script setup lang="ts">
// import { useChatStore } from '@/stores/chat'
// import ChatMessage from '@/components/features/ChatMessage.vue'
// import ChatInput from '@/components/features/ChatInput.vue'

// const chatStore = useChatStore()

// const currentConversation = computed(() => chatStore.currentConversation)
// const messagesContainer = ref<HTMLElement | null>(null)

// Auto-scroll to bottom when new messages arrive
// watch(
//   () => currentConversation.value?.messages.length,
//   async () => {
//     await nextTick()
//     if (messagesContainer.value) {
//       messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
//     }
//   }
// )

// const handleSendMessage = (message: string) => {
//   if (currentConversation.value) {
//     // Add user message
//     chatStore.addMessage(currentConversation.value.id, 'user', message)

//     // Simulate assistant response after short delay
//     setTimeout(() => {
//       if (currentConversation.value) {
//         const responses: string[] = [
//           'That\'s an interesting question! Let me think about that...',
//           'I understand what you\'re asking. Here\'s my perspective...',
//           'Great point! I think we should consider...',
//           'I can help with that. The key points are...'
//         ]
//         const randomResponse = responses[Math.floor(Math.random() * responses.length)]
//         const convId = currentConversation.value.id
//         if (convId && randomResponse) {
//           chatStore.addMessage(convId, 'assistant', randomResponse)
//         }
//       }
//     }, 1000)
//   }
// }
</script>

<template>
  <div class="chat-view">
    <!-- <div v-if="!currentConversation" class="empty-state"> -->
    <div class="empty-state">
      <div class="empty-icon">💬</div>
      <h2>Start a conversation</h2>
      <p>Select an AI Agent from the sidebar to begin</p>
    </div>

    <!-- <template v-else>
      <div class="chat-header">
        <h2>{{ currentConversation.title }}</h2>
      </div>

      <div class="messages-container" ref="messagesContainer">
        <ChatMessage
          v-for="message in currentConversation.messages"
          :key="message.id"
          :role="message.role"
          :content="message.content"
          :timestamp="message.timestamp"
        />
      </div>

      <ChatInput @send="handleSendMessage" />
    </template> -->
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #9ca3af;
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h2 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.chat-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .chat-header {
    padding: 0.75rem;
  }

  .messages-container {
    padding: 0.75rem;
  }
}
</style>
