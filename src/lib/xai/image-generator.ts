import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'

interface ImageGenerationOptions {
  prompt: string
  n?: number
}

interface ImageGenerationResponse {
  created: number
  data: Array<{
    url?: string
    b64_json?: string
  }>
}

interface GeneratedImage {
  url: string
}

export class XAIImageGenerator {
  private apiKey: string
  private baseUrl: string = 'https://api.x.ai/v1/images/generations'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateImage(options: ImageGenerationOptions): Promise<GeneratedImage[]> {
    try {
      console.log('XAI API 요청 시작:', {
        url: this.baseUrl,
        options: {
          ...options,
          apiKey: this.apiKey ? '설정됨' : '설정되지 않음'
        }
      })

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'grok-2-image',
          prompt: options.prompt,
          n: options.n || 1,
          response_format: 'url'
        })
      })

      console.log('XAI API 응답 상태:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('XAI API 오류 응답:', errorData)
        throw new Error(`API 요청 실패 (${response.status}): ${JSON.stringify(errorData)}`)
      }

      const result: ImageGenerationResponse = await response.json()
      console.log('XAI API 성공 응답:', result)
      
      return result.data.map(item => ({
        url: item.url || ''
      }))
    } catch (error) {
      console.error('이미지 생성 중 오류 발생:', error)
      if (error instanceof Error) {
        throw new Error(`이미지 생성 실패: ${error.message}`)
      }
      throw error
    }
  }
}
