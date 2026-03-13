<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useConversationStore } from '@/stores/conversationStore'
import { usePdfDataStore } from '@/stores/pdfDataStore'
import FileUploadModal from '@/components/features/FileUploadModal.vue'
import { pdfService } from '@/services/pdf.service'

const conversationStore = useConversationStore()
const { addPdfData } = usePdfDataStore()

const pdfData = computed(() => usePdfDataStore().pdfData)
const conversations = computed(() => conversationStore.conversations)
const createConversation = computed(() => conversationStore.createConversation)
const agents = computed(() => conversationStore.agents)

const isLoading = ref<boolean>(false)
const response = ref<string>('')
const fileBase64 = ref<string>('')
const isUploadModalOpen = ref<boolean>(false)
const errorMessage = ref<string>('')

onMounted(() => {
  if (!conversations.value.some(item => item.agentName === 'Ai PDF extractor')) {
    createConversation.value(agents.value.find(agent => agent.name === 'Ai PDF extractor')!)
  }
})

const handlePdfFile = async () => {
  closeUploadModal()
  isLoading.value = true
  try {
    const parsedData = await pdfService.sendPdf(fileBase64.value)
    if (!parsedData) {
      response.value = 'The invoice in the document could not be recognized.'
      isLoading.value = false
      return
    }
    addPdfData(parsedData) // json

  } catch (error: any) {
    console.log('AI service failed', error)
    errorMessage.value = `AI service error: ${error?.message}`
  } finally {
    isLoading.value = false
  }
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
        <span v-if="!isLoading">Select PDF-file:</span>
        <span v-else>Extracting data from the PDF-file...</span>
        <input
          id="upload-pdf-file-input"
          type="file"
          class="input-upload"
          style="display: none;"
          accept=".pdf"
          @change="onFilesSelected"
        />
        <div v-if="!isLoading" class="attach-icon" style="cursor: pointer;">
          <span class="pi pi-paperclip" style="font-size: 20px;"></span>
        </div>
      </label>

      <div v-if="!errorMessage" class="message">
        <div v-if="isLoading" class="chat-page-loader">
          <ProgressSpinner style="width: 50px; height: 45px" strokeWidth="3" />
        </div>
        <pre v-else-if="pdfData" class="message-content">{{ pdfData }}</pre>
      </div>

      <div v-else class="message-error">
        {{ errorMessage }}
      </div>
    </div>
    <FileUploadModal
      v-if="isUploadModalOpen"
      title="Processing a PDF file"
      okButtonText="Send"
      cancelButtonText="Cancel"
      :isLoading="isLoading"
      @run-file-upload="handlePdfFile"
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

  .scroll-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    overflow-y: auto;
    padding: $spacer-2;    

    .attach-icon {
      margin-left: $spacer-2;
    }

    .attach-icon:hover {
      color: var(--color-primary-dark);
    }

    .upload-file-label {
      display: flex;
      align-items: center;
      font-size: 16px;
      line-height: 34px;
    }

    .message {
      display: flex;
      margin-bottom: $spacer;
    }

    .message-content {
      padding: 12px 16px;
      border-radius: 8px;
      background-color: #e9e6e6;
      max-width: 100%; 
      white-space: pre-wrap;       /* Поддерживает переносы и пробелы JSON */
      word-wrap: break-word;       /* Разрывает очень длинные слова/ключи */
      overflow-x: hidden;          /* Убирает горизонтальную прокрутку */
    }

    .message-error {
      border: 1px solid  var(--color-error);
      color:  var(--color-error);
      padding: $spacer;
      text-align: center;
    }
  }
}
</style>