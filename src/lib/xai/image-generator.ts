import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'

interface ImageGenerationOptions {
  prompt: string
  n?: number
  size?: string
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
          size: options.size || '1024x1024',
          response_format: 'url'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`API 요청 실패: ${error.error?.message || '알 수 없는 오류'}`)
      }

      const result: ImageGenerationResponse = await response.json()
      
      return result.data.map(item => ({
        url: item.url || ''
      }))
    } catch (error) {
      console.error('이미지 생성 중 오류 발생:', error)
      throw error
    }
  }
}
