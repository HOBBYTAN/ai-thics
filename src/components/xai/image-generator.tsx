'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download } from 'lucide-react'
import Image from 'next/image'

interface GeneratedImage {
  url: string
  localPath?: string
}

const PRESET_PROMPTS = [
  {
    name: 'Hero 배경',
    prompt: 'A modern, abstract background for an AI ethics certification platform. Use a subtle gradient with blue and purple tones, incorporating geometric patterns that suggest transparency, security, and ethical AI. The style should be minimalist and professional, suitable for a tech company website.'
  },
  {
    name: '솔루션 대시보드',
    prompt: 'A modern dashboard interface for AI ethics certification platform. Show various metrics, charts, and scores related to AI ethics evaluation. Use a professional dark theme with blue and purple accents.'
  },
  {
    name: '프레임워크 일러스트',
    prompt: 'A minimalist illustration showing the three pillars of AI ethics evaluation: ethics, security, and interpretability. Use geometric shapes and connecting lines to show the relationship between these components.'
  }
]

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateImage = async () => {
    if (!prompt) {
      setError('프롬프트를 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/xai/generate/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          n: 2,
          responseFormat: 'url'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '이미지 생성에 실패했습니다.')
      }

      setImages(data.images)
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">이미지 생성기</h2>
        <div className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="이미지 생성을 위한 프롬프트를 입력하세요..."
            className="flex-1"
          />
          <Button onClick={generateImage} disabled={loading}>
            {loading ? '생성 중...' : '생성'}
          </Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">프리셋 프롬프트</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {PRESET_PROMPTS.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() => setPrompt(preset.prompt)}
              >
                <div className="text-left">
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {preset.prompt}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, i) => (
            <div key={i} className="relative group">
              <Image
                src={image.url}
                alt={`Generated image ${i + 1}`}
                width={512}
                height={512}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {image.localPath && (
                <a
                  href={image.localPath}
                  download
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
