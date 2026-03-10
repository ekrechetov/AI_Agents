import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Invoice } from '@/views/pdfExtractor/zodInvoiceSheme'

export const usePdfDataStore = defineStore('pdfDataStore', () => {

	const pdfData = ref<Invoice>()

	const addPdfData = (message: Invoice) => {
		pdfData.value = message
	}

	return {
		pdfData,
		addPdfData
	}
})
