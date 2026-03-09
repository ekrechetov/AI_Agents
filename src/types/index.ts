import type { ChatMessage } from "@/shared-types"

export interface Agent {
  id: string
  name: string
  description: string
  path: string
  icon?: string
}

export interface Conversation {
  id: string
  agentId: string
  agentName: string
  agentPath: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date,
}

export interface UIState {
  sidebarOpen: boolean
}

export interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
}
