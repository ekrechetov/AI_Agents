<script setup lang="ts">
import { onMounted, ref, nextTick, computed } from 'vue'
import { aiChatService } from '@/services/aiChat.service.js'
import { useConversationStore } from '@/stores/conversationStore'
import { useMessagesStore } from '@/stores/messagesStore'
import Button from 'primevue/button'

const conversationStore = useConversationStore()
const messageStore = useMessagesStore()

const conversations = computed(() => conversationStore.conversations)
const createConversation = computed(() => conversationStore.createConversation)
const agents = computed(() => conversationStore.agents)
const messages = computed(() => messageStore.messages)

const isBotTyping = ref<boolean>(false)
const inputMessage = ref<string>('')

onMounted(async() => {
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
  const container = document.querySelector('.ai-chat-page-wrap')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const handleSend = async (): Promise<void> => {
  if (!inputMessage.value.trim() || isBotTyping.value) return

  messageStore.addMessage({ role: 'user', parts: [{ text: inputMessage.value }] })
  isBotTyping.value = true
  await nextTick()
  scrollToBottom()

  try {
    const historyForBackend = messageStore.messages.slice(0, -1) || []
    // История передается БЕЗ последнего сообщения
    await aiChatService.sendMessage(
      inputMessage.value, 
      historyForBackend,
      (chunk) => {
        const lastMessage = messageStore.messages?.[messageStore.messages.length - 1]
        if (lastMessage?.parts?.[0]) {
          lastMessage.parts[0].text += chunk
        }
      }
    )
  } catch (error) {
    console.error('Streaming error:', error)
    const lastMessage = messageStore.messages?.[messageStore.messages.length - 1]
    if (lastMessage?.parts?.[0]) {
      lastMessage.parts[0].text = error as string || 'Internal server error (500)'
    }
  } finally {
    inputMessage.value = ''
    isBotTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}
</script>

<template>
  <div class="ai-chat-page">
    <div class="ai-chat-page-wrap">
      <div class="messages-container">
        <TransitionGroup
          name="add-fade"
          tag="ul"
        >
          <div
            v-for="(message, index) in messages || []"
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
    </div>


    <div class="input-area">
      <textarea
        v-model="inputMessage"
        rows="2"
        maxlength="700"
        type="text"
        class="message-input"
        placeholder="Ask something..."
      />
      
      <Button
        v-if="!!inputMessage"
        icon="pi pi-send"
        severity="help"
        rounded
        aria-label="Send button"
        :disabled="isBotTyping || !inputMessage"
        @click="handleSend"
      />

    </div>
  </div>
</template>

<style scoped lang="scss">
.ai-chat-page {
  display: flex;
  flex-direction: column;
  width: 100%;

  &-wrap {
    min-height: 0;
    flex: 1;
    overflow-y: auto;

    .messages-container {
      max-width: 980px;
      display: flex;
      flex-direction: column;
      padding: $spacer-2;
      margin: 0 auto;
      gap: 12px;

      .message {
        display: flex;
        margin-bottom: $spacer;

        .message-content {
          padding: 12px 16px;
          border-radius: 8px;
          max-width: 70%;
          word-wrap: break-word;
          font-size: 16px;
          line-height: 1.4rem;
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
        background-color: $secondary-color-light;
        color: black;
      }

      .bot-typing {
        margin-top: $spacer-2;
        display: flex;
        align-items: center;
        color: #807f7f;
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
  }

  .input-area {
    width: 100%;
    max-width: 980px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: $spacer;
    padding-bottom: $spacer-3;
    padding: $spacer $spacer-2 $spacer-2;
    background-color: #fff;
    flex-shrink: 0;
    margin: 0 auto;

    .message-input {
      flex: 1;
      font-size: 16px;
      color: $primary-text-color;
    }

    .message-input:hover {
      border-color: $primary-color;
    }

    .p-button {
      background: var(--color-primary-dark);
      border: none ;
    }

    .p-button:hover {
      background: var(--color-primary);
    }
  }
}
</style>
