import { GoogleGenAI } from '@google/genai'
import { InvoiceSchema } from '@/views/pdfExtractor/zodInvoiceSheme'

export const parseInvoice = async (pdfBase64: string) => {
  const ai = new GoogleGenAI({ apiKey: 'AIzaSyDE4crskSFnxVepunQFEu7KAqlKmKF2OYw' })

  const prompt = `
    Ти — система для аналізу фінансових документів.
    Проаналізуй інвойс українською мовою.
    Поверни СТРОГО JSON без пояснень.
    Структура:
    ${JSON.stringify(InvoiceSchema, null, 2)}
  `

  try {
    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: pdfBase64.split(',')[1] // Remove the data URL prefix
        }
      }
    ]

    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents
    })

    if (!result.text) return null

    const raw = JSON.parse(result.text)

    // Zod validation
    const parsed = InvoiceSchema.safeParse(raw)
    if (!parsed.success) {
      console.error(parsed.error.format())
      throw new Error('Invalid invoice structure')
    }

    return parsed.data
  } catch (error: unknown) {
    console.error('Error fetching AI response:', error)
    throw error
  }
}