import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { Agent, Conversation } from '@/types'

export const useConversationStore = defineStore('conversationStore', () => {

  const userFirstName = 'Yevhenii' // --- HARDCODED FOR DEMO PURPOSES ---

  const router = useRouter()

  const conversations = ref<Conversation[]>([])
  const currentConversationId = ref<string | null>(null)
  const isExpanded = ref<boolean>(false)

  const setExpanded = (sidebarState: boolean): void => {
    isExpanded.value = sidebarState
  }

  const agents = ref<Agent[]>([
    {
      id: 'assistant-1',
      name: 'AI Chat',
      description: 'Friendly AI-chat with a cute personality',
      icon: 'pi pi-microchip-ai',
      path: '/friendly-ai-chat'
    },
    {
      id: 'assistant-2',
      name: 'Ai PDF extractor',
      description: 'Extract structured data from PDF',
      icon: 'pi pi-file-pdf',
      path: '/pdf-extractor'
    }
  ])

  const currentConversation = computed(() => {
    return conversations.value.find(conv => conv.id === currentConversationId.value)
  })

  const createConversation = (agent: Agent): void => {
    const conversation: Conversation = {
      id: `conv-${Date.now()}`,
      agentId: agent.id,
      agentName: agent.name,
      agentPath: agent.path,
      messages: [
        { role: 'model',
          parts: [
            {
              text: `Привет, ${userFirstName || 'друг'}. О чём бы ты хотел поговорить?`
            }
          ]
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    conversations.value.push(conversation)
    currentConversationId.value = conversation.id
  }

  const deleteConversation = (conversationId: string): void => {
    const index = conversations.value.findIndex(conv => conv.id === conversationId)
    if (index !== -1) {
      conversations.value.splice(index, 1)
      if (conversations.value.length === 0) {
        currentConversationId.value = null
        router.push('/') /* go to home if no conversations left */
      } else {
        currentConversationId.value = conversations.value[0]?.id || null
        /* go to the first conversation's agent path or home if something goes wrong with paths */
        router.push(conversations.value[0]?.agentPath || '/') 
      }
    }
  }

  const selectConversation = (conversationId: string): void => {
    currentConversationId.value = conversationId
  }

  return {
    isExpanded,
    setExpanded,
    agents,
    createConversation,
    deleteConversation,
    selectConversation,
    conversations,
    currentConversationId,
    currentConversation
  }
})
