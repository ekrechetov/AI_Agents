<template>
  <form class="chat-input-form" @submit.prevent="handleSubmit">
    <div class="input-wrapper">
      <textarea
        v-model="message"
        class="chat-input"
        placeholder="Type your message..."
        aria-label="Message input"
        @keydown.enter.ctrl="handleSubmit"
        @keydown.meta.enter="handleSubmit"
        rows="1"
      />
      <button
        type="submit"
        class="send-btn"
        :disabled="!message.trim()"
        aria-label="Send message"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.99 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.01742191 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.38 C0.994623095,2.13399899 0.837654326,3.0765833 1.15159189,3.86203722 L3.03521743,10.3030302 C3.03521743,10.4601275 3.34915502,10.617225 3.50612381,10.617225 L16.6915026,11.4027119 C16.6915026,11.4027119 17.1624089,11.4027119 17.1624089,11.8739045 C17.1624089,12.3450971 17.1624089,12.4744748 16.6915026,12.4744748 Z" />
        </svg>
      </button>
    </div>
    <div class="input-hint">
      <small>Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to send</small>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

const emit = defineEmits<{
  send: [message: string]
}>()

const handleSubmit = () => {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}
</script>

<style scoped>
.chat-input-form {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  max-height: 150px;
  transition: all 0.2s ease;
}

.chat-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background-color: #4f46e5;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background-color: #4338ca;
  transform: translateY(-2px);
}

.send-btn:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.input-hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
  text-align: center;
}

kbd {
  display: inline-block;
  padding: 0.1rem 0.35rem;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.75rem;
}
</style>
