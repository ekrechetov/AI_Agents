<script setup lang="ts">
import { onMounted, ref, nextTick, computed } from 'vue'
import { createChat } from './useGeminiChat'
import { useConversationStore } from '../../stores/conversationStore'

const conversationStore = useConversationStore()

const conversations = computed(() => conversationStore.conversations)
const createConversation = computed(() => conversationStore.createConversation)
const agents = computed(() => conversationStore.agents)
const currentConversation = computed(() => conversationStore.currentConversation)

const isBotTyping = ref<boolean>(false)
const inputMessage = ref<string>('')
const botMessage = ref<string>('')

const chat = createChat()

onMounted(() => {
  if (conversations.value.some(item => item.agentName === 'AI Chat')) {
    // If exist 'AI Chat' conversation, we can download messages
    const existingConversation = conversations.value.find(item => item.agentName === 'AI Chat')
    if (existingConversation) {
      conversationStore.currentConversationId = existingConversation.id
    }
  } else {
    createConversation.value(agents.value.find(agent => agent.name === 'AI Chat')!)
  }
})

const scrollToBottom = (): void => {
  const container = document.querySelector('.messages-container')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const sendMessage = async (): Promise<void> => {
  if (!inputMessage.value.trim()) return
  currentConversation.value?.messages.push({ role: 'user', parts: [ { text: inputMessage.value } ] })
  isBotTyping.value = true
  await nextTick()
  scrollToBottom()
  try {
    const stream = await chat.sendMessageStream({
      message: inputMessage.value
    })

    inputMessage.value = ''
    botMessage.value = ''
    currentConversation.value?.messages.push({ role: 'model', parts: [ { text: botMessage.value } ] })

    for await (const chunk of stream) {
      if (chunk?.text) {
        botMessage.value += chunk.text
        const lastMessage = currentConversation.value?.messages[currentConversation.value.messages.length - 1]
        if (lastMessage?.role === 'model' && lastMessage.parts?.[0]) {
          lastMessage.parts[0].text = botMessage.value
          scrollToBottom()
        }
      }
    }
  } catch (error: unknown) {
    console.error('Error fetching AI response:', error)
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Произошла ошибка при получении ответа от AI.'
    currentConversation.value?.messages.push({ role: 'model', parts: [ { text: errorMessage } ] })
  } finally {
    isBotTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}
</script>

<template>
  <div class="ai-chat-page">
    <div class="messages-container">
      <TransitionGroup
        name="add-fade"
        tag="ul"
      >
        <div
          v-for="(message, index) in currentConversation?.messages || []"
          :key="index"
          :class="['message', message.role === 'model' ? 'message-bot' : 'message-user']"
        >
          <p class="message-content">{{ message?.parts?.[0]?.text }}</p>
        </div>
        <div v-if="isBotTyping" class="bot-typing message-content">
          <div style="margin-right: 4px;">ИИ пишет:</div>
          <div class="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <div class="input-area">
      <textarea
        v-model="inputMessage"
        rows="2"
        maxlength="700"
        autofocus
        type="text"
        class="message-input"
        placeholder="Спроси что-нибудь..."
      />
      <button class="send-button" @click="() => sendMessage()">Отправить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ai-chat-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;

  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: $spacer-2 $spacer-3;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .message {
      display: flex;
      margin-bottom: 8px;

      .message-content {
        padding: 12px 16px;
        border-radius: 8px;
        max-width: 70%;
        word-wrap: break-word;
        font-size: 16px;
        font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
      }
    }

    .message-bot {
      justify-content: flex-start;
    }

    .message-user {
      justify-content: flex-end;
    }

    .message-bot .message-content {
      background-color: #ebeaea;
      color: #000;
    }

    .message-user .message-content {
      background-color: $secondary-color;
      color: black;
    }

    .bot-typing {
      margin-top: $spacer-2;
      display: flex;
      align-items: center;
      color: #807f7f;
      font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
    }
    .dots span {
      width: 5px;
      height: 5px;
      margin-left: 4px;
      background: #999;
      border-radius: 50%;
      display: inline-block;
      animation: blink 1.4s infinite both;
    }

    .dots span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dots span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes blink {
      0% {
        opacity: 0.2;
      }
      20% {
        opacity: 1;
      }
      100% {
        opacity: 0.2;
      }
    }
  }

  .input-area {
    display: flex;
    gap: 10px;
    padding: $spacer-2 $spacer-3;
    background-color: #fff;
    flex-shrink: 0;

    .message-input {
      flex: 1;
      font-size: 16px;
      font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
      color: $primary-text-color;
    }

    .message-input:hover {
      border-color: $primary-color;
    }

    .send-button {
      align-self: center;
      padding: 8px 12px;
      background-color: var(--color-primary);
      font-size: 16px;
      color: black;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }

    .send-button:hover {
      background-color: rgb(154, 132, 228);
    }
  }
}
</style>
