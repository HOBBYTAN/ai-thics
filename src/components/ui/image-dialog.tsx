'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface ImageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageUrl: string
  prompt: string
}

export function ImageDialog({ open, onOpenChange, imageUrl, prompt }: ImageDialogProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-thics-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('이미지 다운로드 중 오류 발생:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="p-6 bg-white border-b">
          <DialogTitle className="text-2xl font-semibold">이미지 상세 보기</DialogTitle>
        </DialogHeader>
        <div className="relative bg-gray-50">
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={prompt}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-end justify-between gap-4">
              <p className="text-base text-white flex-1">{prompt}</p>
              <Button 
                onClick={handleDownload} 
                variant="default"
                size="lg"
                className="shrink-0 shadow-lg hover:shadow-xl transition-shadow bg-white text-gray-900 hover:bg-gray-50"
              >
                <Download className="mr-2 h-5 w-5" />
                다운로드
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 