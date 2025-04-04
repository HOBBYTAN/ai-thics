'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageDialog } from '@/components/ui/image-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2 } from 'lucide-react'

interface GeneratedImage {
  _id: string
  prompt: string
  url: string
  size: string
  createdAt: string
}

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [history, setHistory] = useState<GeneratedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/xai/history')
      const data = await response.json()
      setHistory(data.images)
    } catch (error) {
      console.error('히스토리 조회 중 오류 발생:', error)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/xai/generate/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      if (data.images) {
        setImages(data.images)
        fetchHistory() // 새 이미지 생성 후 히스토리 갱신
      }
    } catch (error) {
      console.error('이미지 생성 중 오류 발생:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">AI 이미지 생성기</h1>
          <p className="text-lg text-gray-600">상상하는 모든 것을 이미지로 만들어보세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="이미지를 생성할 프롬프트를 입력하세요..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  className="h-12 text-lg"
                />
                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading}
                  className="h-12 px-6 text-lg font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    '생성하기'
                  )}
                </Button>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {images.map((image) => (
                  <div
                    key={image._id}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all hover:shadow-md"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="absolute bottom-4 left-4 right-4 text-sm text-white line-clamp-2">
                        {image.prompt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">생성 히스토리</h2>
              <span className="text-sm text-gray-500">{history.length}개의 이미지</span>
            </div>
            <ScrollArea className="h-[700px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item._id}
                    className="group cursor-pointer space-y-3 rounded-lg border border-gray-100 p-3 transition-all hover:bg-gray-50"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={item.url}
                        alt={item.prompt}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-700 line-clamp-2">{item.prompt}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageDialog
          open={!!selectedImage}
          onOpenChange={(open) => !open && setSelectedImage(null)}
          imageUrl={selectedImage.url}
          prompt={selectedImage.prompt}
        />
      )}
    </div>
  )
}
