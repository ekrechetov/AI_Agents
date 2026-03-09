import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ChatMessage } from '@shared/index.js'
export const useMessagesStore = defineStore('messagesStore', () => {

	const messages = ref<ChatMessage[]>([
		{
			role: 'model',
			parts: [ { text: 'Привет! О чём бы ты хотел поговорить?' } ]
		}
	])

	const addMessage = (message: ChatMessage) => {
		messages.value.push(message)
	}

	return {
		messages,
		addMessage
	}
})
