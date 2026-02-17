<template>
  <div
    :class="['message', `message-${role}`]"
    :aria-label="ariaLabel"
  >
    <div class="message-avatar">
      <span v-if="role === 'user'" aria-hidden="true">👤</span>
      <span v-else aria-hidden="true">🤖</span>
    </div>
    <div class="message-content">
      <p>{{ content }}</p>
      <time class="message-time" :datetime="timestamp.toISOString()">
        {{ formatTime(timestamp) }}
      </time>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const props = defineProps<Props>()

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const ariaLabel = computed(() => {
  const sender = props.role === 'user' ? 'Your' : 'Assistant'
  return `${sender} message: ${props.content}`
})
</script>

<style scoped>
.message {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-user {
  flex-direction: row-reverse;
}

.message-avatar {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-user .message-content {
  text-align: right;
}

.message-content p {
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  line-height: 1.5;
}

.message-assistant .message-content p {
  background-color: #f3f4f6;
  color: #1f2937;
}

.message-user .message-content p {
  background-color: #4f46e5;
  color: #ffffff;
}

.message-time {
  display: block;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
  padding: 0 1rem;
}

.message-user .message-time {
  text-align: right;
}
</style>
