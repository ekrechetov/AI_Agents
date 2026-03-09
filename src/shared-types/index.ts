/* Data Transfer Objects (DTOs) for AI chat interactions */

export interface Part {
	text: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  parts: Part[]
	id?: string
  timestamp?: Date
}

export interface ChatRequest {
	message: string
  history: ChatMessage[]
}

export type ChatRole =
  | 'model'
  | 'user'