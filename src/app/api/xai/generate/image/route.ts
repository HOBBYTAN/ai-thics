import { XAIImageGenerator } from '@/lib/xai/image-generator'
import { NextRequest, NextResponse } from 'next/server'

const XAI_API_KEY = process.env.XAI_API_KEY

export async function POST(req: NextRequest) {
  if (!XAI_API_KEY) {
    return NextResponse.json(
      { error: 'API 키가 설정되지 않았습니다.' },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const { prompt, n = 1, responseFormat = 'url' } = body

    if (!prompt) {
      return NextResponse.json(
        { error: '프롬프트가 필요합니다.' },
        { status: 400 }
      )
    }

    const generator = new XAIImageGenerator(XAI_API_KEY)
    const generatedImages = await generator.generateImage({
      prompt,
      n,
      responseFormat
    })

    return NextResponse.json({ images: generatedImages })
  } catch (error: any) {
    console.error('이미지 생성 API 오류:', error)
    return NextResponse.json(
      { error: error.message || '이미지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
