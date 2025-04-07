import { XAIError } from '../exceptions'

interface XAIImageData {
  url: string
}

interface XAIAPIResponse {
  data: XAIImageData[]
}

export class ImageGenerator {
  private readonly baseUrl = 'https://api.x.ai/v1/images/generations'
  private readonly apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateImage(prompt: string, count: number = 2, width: number = 1024, height: number = 1024): Promise<string[]> {
    try {
      console.log('XAI API 요청:', {
        url: this.baseUrl,
        prompt,
        count,
        width,
        height,
        apiKey: this.apiKey ? '설정됨' : '설정되지 않음'
      })

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'grok-2-image',
          prompt,
          n: count,
          response_format: 'url',
          width: width,
          height: height,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('XAI API 에러 응답:', {
          status: response.status,
          statusText: response.statusText,
          error
        })
        throw new XAIError(error.error || error.message || '이미지 생성 중 오류가 발생했습니다.')
      }

      const data = await response.json() as XAIAPIResponse
      console.log('XAI API 응답:', data)
      return data.data.map((item: XAIImageData) => item.url)
    } catch (error) {
      if (error instanceof XAIError) {
        throw error
      }
      console.error('XAI API 예외 발생:', error)
      throw new XAIError('이미지 생성 중 오류가 발생했습니다.')
    }
  }
}
