import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'

interface ImageGenerationOptions {
  prompt: string
  n?: number
  responseFormat?: 'url' | 'b64_json'
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
  localPath?: string
}

export class XAIImageGenerator {
  private apiKey: string
  private baseUrl: string = 'https://api.x.ai/v1/images/generations'
  private saveDir: string = path.join(process.cwd(), 'public', 'generated-images')

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.ensureSaveDirectory()
  }

  private ensureSaveDirectory() {
    if (!fs.existsSync(this.saveDir)) {
      fs.mkdirSync(this.saveDir, { recursive: true })
    }
  }

  private async downloadImage(url: string): Promise<string> {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`
    const filePath = path.join(this.saveDir, fileName)
    
    fs.writeFileSync(filePath, Buffer.from(buffer))
    return `/generated-images/${fileName}`
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
          response_format: options.responseFormat || 'url'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`API 요청 실패: ${error.error?.message || '알 수 없는 오류'}`)
      }

      const result: ImageGenerationResponse = await response.json()
      
      // 이미지 URL을 받아서 로컬에 저장하고 결과 반환
      const savedImages = await Promise.all(
        result.data.map(async (item) => {
          const imageUrl = item.url || ''
          if (!imageUrl) return { url: '' }
          
          try {
            const localPath = await this.downloadImage(imageUrl)
            return { url: imageUrl, localPath }
          } catch (error) {
            console.error('이미지 저장 중 오류:', error)
            return { url: imageUrl }
          }
        })
      )

      return savedImages
    } catch (error) {
      console.error('이미지 생성 중 오류 발생:', error)
      throw error
    }
  }
}
