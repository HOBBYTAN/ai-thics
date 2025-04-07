'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageDialog } from '@/components/ui/image-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Download, Share2, History, ChevronDown, X } from 'lucide-react'

interface GeneratedImage {
  _id: string
  prompt: string
  url: string
  size: string
  createdAt: string
}

// 스타일 옵션 정의
const STYLE_OPTIONS = [
  { id: 'auto', name: '자동', prompt: '', image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=200' },
  { id: 'natural', name: '자연', prompt: 'natural style', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=200' },
  { id: '3d', name: '3D 애니메이션', prompt: '3D animation style', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=200' },
  { id: '3d-model', name: '3D 모델링', prompt: '3D modeling style', image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=200' },
  { id: 'anime', name: '일본 애니메이션', prompt: 'anime style', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200' },
  { id: 'cinematic', name: '영화 스타일', prompt: 'cinematic style', image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=200' },
  { id: 'comic', name: '만화', prompt: 'comic book style', image: 'https://images.unsplash.com/photo-1612036782180-6f0822045d23?q=80&w=200' },
  { id: 'cyberpunk', name: '사이버펑크', prompt: 'cyberpunk style', image: 'https://images.unsplash.com/photo-1542323228-002ac256e7b8?q=80&w=200' },
  { id: 'fantasy', name: '판타지 아트', prompt: 'fantasy art style', image: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?q=80&w=200' },
  { id: 'painting', name: '유화', prompt: 'oil painting style', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=200' },
  { id: 'watercolor', name: '수채화', prompt: 'watercolor painting style', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=200' },
  { id: 'pixel', name: '픽셀 아트', prompt: 'pixel art style', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200' },
  { id: 'portrait', name: '사실적', prompt: 'photorealistic portrait style', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' },
]

// 화면 비율 옵션
const ASPECT_RATIOS = [
  { id: 1, label: '16:9', value: '16:9', width: 1024, height: 576 },
  { id: 2, label: '4:3', value: '4:3', width: 1024, height: 768 },
  { id: 3, label: '1:1', value: '1:1', width: 1024, height: 1024 },
  { id: 4, label: '3:4', value: '3:4', width: 768, height: 1024 },
  { id: 5, label: '9:16', value: '9:16', width: 576, height: 1024 },
]

// 이미지 로드 오류 처리를 위한 컴포넌트
const ImageWithFallback = ({ src, alt, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setLoadError(false)
  }, [src])

  return (
    <>
      {loadError ? (
        <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-center p-4">
          <span className="text-gray-400 mb-1">이미지가 만료되었습니다</span>
          <span className="text-xs text-gray-500">X.AI 이미지는 일정 시간 후 만료됩니다</span>
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          {...props}
          onError={() => {
            setLoadError(true)
          }}
        />
      )}
    </>
  )
}

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [history, setHistory] = useState<GeneratedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)
  const [activeRatio, setActiveRatio] = useState(3) // 기본 비율은 1:1
  const [imageCount, setImageCount] = useState(2) // 기본 이미지 생성 수
  const [selectedStyle, setSelectedStyle] = useState(STYLE_OPTIONS[0]) // 기본 스타일
  const [showHistory, setShowHistory] = useState(false) // 히스토리 모달 표시 여부

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/xai/history')
      const data = await response.json()
      setHistory(data.images || [])
    } catch (error) {
      console.error('히스토리 조회 중 오류 발생:', error)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    // 스타일과 비율을 프롬프트에 추가
    const selectedRatio = ASPECT_RATIOS.find(ratio => ratio.id === activeRatio)
    let finalPrompt = prompt
    
    // 자동이 아닌 경우에만 스타일과 비율을 추가
    if (selectedStyle.id !== 'auto') {
      finalPrompt = `${selectedStyle.prompt}, aspect ratio ${selectedRatio?.value}, ${prompt}`
    }
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/xai/generate/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: finalPrompt,
          n: imageCount,
          width: selectedRatio?.width,
          height: selectedRatio?.height
        }),
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
  
  // 선택한 이미지 다운로드
  const handleDownload = async (url: string, e?: React.MouseEvent) => {
    // 이벤트가 있는 경우 전파 방지
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    try {
      // 1. 새 탭에서 열기 방식 (가장 신뢰할 수 있는 방법)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-thics-image-${Date.now()}.png`
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      // 2. 직접 다운로드 시도 (CORS 정책이 허용하는 경우)
      try {
        const response = await fetch(url)
        if (response.ok) {
          const blob = await response.blob()
          const blobUrl = URL.createObjectURL(blob)
          
          const link = document.createElement('a')
          link.href = blobUrl
          link.download = `ai-thics-image-${Date.now()}.png`
          document.body.appendChild(link)
          link.click()
          
          URL.revokeObjectURL(blobUrl)
          document.body.removeChild(link)
        }
      } catch (fetchError) {
        console.log('직접 다운로드 실패, 링크로 대체됨:', fetchError)
      }
    } catch (error) {
      console.error('다운로드 중 오류 발생:', error)
    }
  }
  
  // 이미지 공유
  const handleShare = (url: string) => {
    if (navigator.share) {
      navigator.share({
        title: '생성된 AI 이미지',
        text: '내가 AI로 생성한 이미지를 확인해보세요!',
        url: url
      })
    } else {
      // 공유 API를 지원하지 않는 경우 클립보드에 복사
      navigator.clipboard.writeText(url)
        .then(() => alert('이미지 URL이 클립보드에 복사되었습니다.'))
        .catch(err => console.error('클립보드 복사 실패:', err))
    }
  }

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">AI 이미지 생성기</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-gray-400 h-8 w-8 p-0 border-none"
            onClick={() => images.length > 0 && handleShare(images[0].url)}>
            <Share2 size={18} />
          </Button>
          <Button variant="outline" size="sm" className="text-gray-400 h-8 w-8 p-0 border-none"
            onClick={(e) => images.length > 0 && handleDownload(images[0].url, e)}>
            <Download size={18} />
          </Button>
          <Button variant="outline" size="sm" className="text-gray-400 h-8 w-8 p-0 border-none"
            onClick={() => setShowHistory(true)}>
            <History size={18} />
          </Button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-1">
        {/* 왼쪽 사이드바 */}
        <div className="w-80 border-r border-gray-800 p-4">
          <div className="mb-6">
            <div className="mb-2 flex items-center">
              <div className="mr-2 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div>
                <h3 className="text-sm font-medium">X.AI Image Generator</h3>
                <p className="text-xs text-gray-400">고해상도 이미지 생성이 가능한 모델</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium">스타일</h4>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
              {STYLE_OPTIONS.map((style) => (
                <div 
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`relative cursor-pointer rounded-md overflow-hidden border ${selectedStyle.id === style.id ? 'border-blue-500' : 'border-gray-700'}`}
                >
                  <div className="aspect-square w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 right-1 text-xs text-white z-20 line-clamp-1">{style.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium">화면 비율</h4>
            <div className="grid grid-cols-3 gap-2">
              {ASPECT_RATIOS.map((ratio) => (
                <div 
                  key={ratio.id}
                  className={`flex h-9 w-full cursor-pointer items-center justify-center rounded-md border ${activeRatio === ratio.id ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700'}`} 
                  onClick={() => setActiveRatio(ratio.id)}
                >
                  <span className="text-xs">{ratio.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium">프롬프트 입력</h4>
            <div className="w-full">
              <textarea
                placeholder="이미지를 생성할 프롬프트를 입력하세요..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-24 p-2 bg-gray-900 border border-gray-700 rounded-md text-sm resize-none focus:outline-none focus:border-blue-500"
                maxLength={1000}
              />
              <div className="text-right text-xs text-gray-500 mt-1">{prompt.length}/1000</div>
              <Button 
                variant="default"
                onClick={handleGenerate} 
                disabled={isLoading || !prompt.trim()}
                className="w-full mt-3 bg-blue-700 hover:bg-blue-800"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  '이미지 생성하기'
                )}
              </Button>
            </div>
          </div>

          <div className="mb-4 mt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">생성 수</h4>
              <div className="flex">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className={`mx-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md ${num === imageCount ? 'bg-blue-600' : 'bg-gray-800'}`}
                    onClick={() => setImageCount(num)}
                  >
                    <span className="text-xs">{num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* 이미지 표시 영역 */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
                  <p className="text-sm text-gray-300">이미지 생성중입니다. 잠시 기다려주세요...</p>
                  <p className="mt-1 text-xs text-gray-500">9s</p>
                </div>
              </div>
            ) : images.length > 0 ? (
              <div className={`grid ${imageCount > 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'} gap-4 pb-4`}>
                {images.map((image) => (
                  <div
                    key={image._id}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(image)}
                  >
                    <ImageWithFallback
                      src={image.url}
                      alt={image.prompt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <p className="text-sm text-white line-clamp-1 flex-1">{image.prompt.substring(0, 30)}...</p>
                        <div className="flex gap-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(image.url, e);
                            }}
                            className="p-1 rounded-full bg-gray-800/80 hover:bg-gray-700"
                          >
                            <Download size={14} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(image.url);
                            }}
                            className="p-1 rounded-full bg-gray-800/80 hover:bg-gray-700"
                          >
                            <Share2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">프롬프트를 입력하고 이미지를 생성해보세요</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 이미지 상세 보기 다이얼로그 */}
      {selectedImage && (
        <ImageDialog
          open={!!selectedImage}
          onOpenChange={(open) => !open && setSelectedImage(null)}
          imageUrl={selectedImage.url}
          prompt={selectedImage.prompt}
        />
      )}
      
      {/* 히스토리 모달 */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <div className="flex items-center gap-2">
                <History size={18} />
                <h2 className="text-lg font-semibold">기록</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0 border-none"
                onClick={() => setShowHistory(false)}
              >
                <X size={18} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-hidden p-4">
              <div className="flex gap-4 mb-4">
                <button className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm font-medium">전체</button>
                <button className="px-4 py-2 rounded-full bg-gray-800/30 text-gray-400 text-sm">이미지</button>
                <button className="px-4 py-2 rounded-full bg-gray-800/30 text-gray-400 text-sm">비디오</button>
              </div>
              
              <h3 className="text-gray-400 text-sm mb-2">오늘</h3>
              
              <ScrollArea className="flex-1 overflow-y-auto max-h-[calc(80vh-160px)]">
                <div className="grid grid-cols-3 gap-3">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <div 
                        key={item._id}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedImage(item);
                          setShowHistory(false);
                        }}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 mb-1">
                          <ImageWithFallback
                            src={item.url}
                            alt={item.prompt}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1">{item.prompt}</p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 flex flex-col items-center justify-center h-40">
                      <p className="text-gray-500 mb-2">생성된 이미지가 없습니다</p>
                      <p className="text-xs text-gray-400">프롬프트를 입력하고 이미지를 생성해보세요</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t border-gray-800 p-4">
                <button className="w-full py-2 text-gray-400 text-sm">
                  이전 버전 기록 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
