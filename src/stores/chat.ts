import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Conversation, Message, Agent } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const conversations = ref<Conversation[]>([])
  const currentConversationId = ref<string | null>(null)
  const agents = ref<Agent[]>([
    {
      id: 'assistant-1',
      name: 'AI Assistant',
      description: 'General purpose AI assistant',
      avatar: '🤖'
    },
    {
      id: 'assistant-2',
      name: 'Code Wizard',
      description: 'Programming assistance',
      avatar: '✨'
    },
    {
      id: 'assistant-3',
      name: 'Content Creator',
      description: 'Content writing help',
      avatar: '📝'
    }
  ])

  const currentConversation = computed(() => {
    return conversations.value.find(c => c.id === currentConversationId.value)
  })

  function createConversation(agentId: string, title: string): Conversation {
    const conversation: Conversation = {
      id: `conv-${Date.now()}`,
      agentId,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    conversations.value.push(conversation)
    currentConversationId.value = conversation.id
    return conversation
  }

  function selectConversation(conversationId: string): void {
    currentConversationId.value = conversationId
  }

  function addMessage(conversationId: string, role: 'user' | 'assistant', content: string): Message {
    const conversation = conversations.value.find(c => c.id === conversationId)
    if (!conversation) throw new Error('Conversation not found')

    const message: Message = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date()
    }

    conversation.messages.push(message)
    conversation.updatedAt = new Date()

    return message
  }

  function deleteConversation(conversationId: string): void {
    const index = conversations.value.findIndex(c => c.id === conversationId)
    if (index !== -1) {
      conversations.value.splice(index, 1)
      if (currentConversationId.value === conversationId) {
        currentConversationId.value = conversations.value[0]?.id || null
      }
    }
  }

  return {
    conversations,
    currentConversationId,
    currentConversation,
    agents,
    createConversation,
    selectConversation,
    addMessage,
    deleteConversation
  }
})
