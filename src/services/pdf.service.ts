const apiBaseURL = import.meta.env.VITE_API_URL

export const pdfService = {

  async sendPdf (pdfBase64: string) {

    const response = await fetch(`${apiBaseURL}/api/pdf-extractor/extractor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Transfer-Encoding': 'base64'
      },
      body: pdfBase64.split(',')[1]
    })

    if (!response.body) throw new Error('No body in response')

    const data = await response.json()

    return data
  }
}
