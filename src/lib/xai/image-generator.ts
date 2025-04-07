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

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 60000)

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
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage
        try {
          const errorData = await response.json()
          console.error('XAI API 에러 응답 (JSON):', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          })
          errorMessage = errorData.error || errorData.message || '이미지 생성 중 오류가 발생했습니다.'
        } catch (parseError) {
          const errorText = await response.text()
          console.error('XAI API 에러 응답 (TEXT):', {
            status: response.status,
            statusText: response.statusText,
            errorText
          })
          errorMessage = `API 오류 (${response.status}): ${errorText.substring(0, 100)}`
        }
        throw new XAIError(errorMessage)
      }

      let data
      try {
        data = await response.json() as XAIAPIResponse
        console.log('XAI API 응답:', data)
        
        if (!data.data || !Array.isArray(data.data)) {
          console.error('XAI API 응답 형식 오류:', data)
          throw new Error('API 응답 형식이 올바르지 않습니다.')
        }
        
        return data.data.map((item: XAIImageData) => item.url)
      } catch (_parseError) {
        console.error('XAI API 응답 파싱 오류:', _parseError)
        throw new XAIError('API 응답을 처리할 수 없습니다.')
      }
    } catch (error) {
      if (error instanceof XAIError) {
        throw error
      }
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.error('XAI API 요청 타임아웃')
        throw new XAIError('API 요청 시간이 초과되었습니다. 나중에 다시 시도해 주세요.')
      }
      console.error('XAI API 예외 발생:', error)
      throw new XAIError('이미지 생성 중 오류가 발생했습니다.')
    }
  }
}
