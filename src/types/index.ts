/**
 * AI Agent Types and Interfaces
 */

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Agent {
  id: string
  name: string
  description: string
  avatar?: string
}

export interface Conversation {
  id: string
  agentId: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface UIState {
  sidebarOpen: boolean
}

export interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
}



export interface TabbarItemType {
	path: string;
	label: string;
}
