import { XAIImageGenerator } from '@/lib/xai/image-generator'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { GeneratedImage } from '@/models/GeneratedImage'

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
    const { prompt, n = 3, size = '1024x1024' } = body

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
      size
    })

    // MongoDB에 연결
    await connectDB()

    // 생성된 이미지들을 데이터베이스에 저장
    const savedImages = await Promise.all(
      generatedImages.map(async (image) => {
        const savedImage = await GeneratedImage.create({
          prompt,
          url: image.url,
          size
        })
        return savedImage
      })
    )

    return NextResponse.json({ images: savedImages })
  } catch (error: any) {
    console.error('이미지 생성 API 오류:', error)
    return NextResponse.json(
      { error: error.message || '이미지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
