import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'
import { XAIError } from '../exceptions'

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

export class ImageGenerator {
  private readonly baseUrl = 'https://api.x.ai/v1/images/generations'
  private readonly apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateImage(prompt: string): Promise<string[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'grok-2-image',
          prompt,
          n: 2,
          response_format: 'url',
          quality: 'hd',
          width: 1024,
          height: 1024,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new XAIError(error.message || '이미지 생성 중 오류가 발생했습니다.')
      }

      const data = await response.json()
      return data.data.map((item: any) => item.url)
    } catch (error) {
      if (error instanceof XAIError) {
        throw error
      }
      throw new XAIError('이미지 생성 중 오류가 발생했습니다.')
    }
  }
}
