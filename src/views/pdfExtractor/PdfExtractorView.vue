<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useConversationStore } from '@/stores/conversationStore'
import FileUploadModal from '@/components/features/FileUploadModal.vue'
import type { Invoice } from '@/views/pdfExtractor/zodInvoiceSheme'
import { parseInvoice } from '@/views/pdfExtractor/useGeminiInvoice'

const conversationStore = useConversationStore()

const conversations = computed(() => conversationStore.conversations)
const createConversation = computed(() => conversationStore.createConversation)
const agents = computed(() => conversationStore.agents)

const invoice = ref<Invoice | null>(null)
const isLoading = ref<boolean>(false)
const response = ref<string>('')
const fileBase64 = ref<string>('')
const isUploadModalOpen = ref<boolean>(false)

onMounted(() => {
  if (!conversations.value.some(item => item.agentName === 'Ai PDF extractor')) {
    createConversation.value(agents.value.find(agent => agent.name === 'Ai PDF extractor')!)
  }
})

const handlePdfFile = async () => {
  closeUploadModal()
  isLoading.value = true
  const parsedData = await parseInvoice(fileBase64.value)
  if (!parsedData) {
    response.value = 'Не удалось распознать инвойс в документе.'
    isLoading.value = false
    return
  }
  console.log('JSON:', JSON.stringify(parsedData))
  invoice.value = parsedData
  isLoading.value = false
}

const convertPdfToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file) /* Read file as Data URL (Base64) */

    reader.onload = () => resolve(reader.result) /* ACCESS the result when done */

    reader.onerror = (error) => reject(error)
  })
}

const onFilesSelected = async (event: Event) => {
  event.preventDefault()
  const uploadFile = (event?.target as HTMLInputElement).files?.[0]
  if (!uploadFile) return
  try {
    fileBase64.value = await convertPdfToBase64(uploadFile) as string
    isUploadModalOpen.value = true
  } catch (error) {
    console.error(error)
  }
}

const closeUploadModal = () => {
  isUploadModalOpen.value = false
}
</script>

<template>
  <div class="ai-chat-page">
    <div class="scroll-container">

      <label class="upload-file-label" style="display: flex;">
        <span v-if="!isLoading">Выберите PDF-файл для получения данных:</span>
        <span v-else>Получение данных из PDF-файла...</span>
        <input
          id="upload-pdf-file-input"
          type="file"
          class="input-upload"
          style="display: none;"
          accept=".pdf"
          @change="onFilesSelected"
        />
        <div v-if="!isLoading" class="attach-icon" style="cursor: pointer;">
          <!-- <AttachIcon :iconSize="20" /> -->
          <span class="pi pi-paperclip" style="font-size: 20px;"></span>
        </div>
      </label>

      <div class="message">
        <div v-if="isLoading" class="chat-page-loader">
          <ProgressSpinner style="width: 50px; height: 45px" strokeWidth="3" />
        </div>
        <p v-else-if="invoice" class="message-content">{{ invoice }}</p>
      </div>
    </div>
    <FileUploadModal
      v-if="isUploadModalOpen"
      title="Обработка PDF файла"
      okButtonText="Отправить"
      cancelButtonText="Отменить"
      :isLoading="isLoading"
      @run-file-upload="handlePdfFile()"
      @close-upload-modal="closeUploadModal"
    >
      <template v-slot:uploadModal>
        <div class="media-preview">
          <embed
            :src="fileBase64"
            type="application/pdf"
            class="media-preview__img"
            width="100%"
            height="600px"
            alt="PDF preview"
          />
        </div>
      </template>
    </FileUploadModal>
  </div>
</template>

<style scoped lang="scss">
.ai-chat-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .scroll-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .attach-icon {
      margin-left: $spacer;
    }

    .upload-file-label {
      font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,sans-serif;
      font-size: 16px;
    }

    .message {
      display: flex;
      margin-bottom: 8px;
    }

    .message-content {
      padding: 12px 16px;
      border-radius: 8px;
      max-width: 70%;
      word-wrap: break-word;
      background-color: #e0e0e0;
    }
  }
}
</style>