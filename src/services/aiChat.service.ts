import type { ChatMessage } from '@shared/index.js'
import { useMessagesStore } from '@/stores/messagesStore'

const apiBaseURL = import.meta.env.VITE_API_URL

export const aiChatService = {
  async sendMessage  (
    message: string, 
    history: ChatMessage[], 
    onChunk: (text: string) => void
  ) {
    const messageStore = useMessagesStore()

    const response = await fetch(`${apiBaseURL}/api/ai-chat/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    })

    if (!response.body) throw new Error('No body in response')

    /* Create empty chat message for response */
    messageStore.addMessage({
      role: 'model',
      parts: [ { text: '' } ]
    })

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader?.read()
      if (done) break
      
      const chunk = decoder.decode(value, { stream: true })

      onChunk(chunk); // Pass a chunk of text to the component
    }
  }
}
