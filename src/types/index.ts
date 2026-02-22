/**
 * AI Agent Types and Interfaces
 */

export interface Message {
  id?: string
  role: 'user' | 'model'
  parts: { text: string }[]
  timestamp?: Date
}

export interface Agent {
  id: string
  name: string
  description: string
  path: string
  icon?: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  parts: { text: string }[]
}

export interface Conversation {
  id: string
  agentId: string
  agentName: string
  agentPath: string
  messages: Message[]
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
